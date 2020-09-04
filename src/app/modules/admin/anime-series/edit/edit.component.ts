import { Component, OnInit } from '@angular/core';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { DatePipe } from '@angular/common';
import { Util } from 'src/app/core/Util';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';
import { SeasonsEpisodes } from '@app/shared/models/seasons-episodes';
import { Picture } from '@app/shared/models/picture';
import { BasicResponse } from '@app/shared/models/responses/basic-response';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';

@Component({
  selector: 'app-admin-animeseries-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  /**
   * The value to keep track of form submission
   */
  public submitted : boolean = false;

  /**
   * The form group
   */
  public form: FormGroup;

  /**
   * The series that we recieved from the server
   */
  public series: AnimeSeries;

  /**
   * The image that's submitted
   */
  public submittedImage: string = '';

  constructor(
    public animeService: AnimeService, 
    private fb: FormBuilder,
    private notification: AlertService,
    private datePipe: DatePipe) {
      this.form = fb.group({
        "id": [''],
        "englishTitle": [''],
        "japaneseTitle": [''],
        "type": [''],
        "episodes": [''],
        "releaseDate": [''],
        "finishDate": [''],
        "synopsis": [''],
        'image': ['']
      });
    }

  ngOnInit(): void {
    this.getSeries(this.animeService.getObjectId());
  }

  /**
   * Handles the form submission
   */
  public onSubmit() {
    this.submitted = true;
    let newSeries : AnimeSeries = new AnimeSeries(
      this.form.get('id').value,
      this.form.get('englishTitle').value,
      this.form.get('japaneseTitle').value,
      this.form.get('type').value,
      this.form.get('releaseDate').value,
      this.form.get('finishDate').value,
      this.form.get('synopsis').value,
      new Picture(this.submittedImage.length ? this.submittedImage : this.series.picture.imageData),
      [new SeasonsEpisodes(this.form.get('episodes').value, 0)]
    );

    /**
     * Checks if both titles are null
     */
    if (Util.stringInvalidOrEmpty(newSeries.englishTitle) && Util.stringInvalidOrEmpty(newSeries.japaneseName)) {
      this.submitted = false;
      this.notification.add(new Alert("Both titles can't be blank", Status.DANGER));
      return;
    }

    /**
     * check if series page is the same
     */
    if (JSON.stringify(this.series) === JSON.stringify(newSeries)) {
      this.submitted = false;
      this.notification.add(new Alert("Make changes before submission", Status.DANGER));
      return;
    }

    this.animeService.requestAnimeUpdate(newSeries).subscribe((response: BasicResponse) => {
      if (response.success) {
        this.notification.add(new Alert(newSeries.englishTitle + " got saved, reloading series ", Status.SUCCESS));
        this.getSeries(newSeries.id);
        this.submitted = false;
        this.submittedImage = '';
      } else {
        this.notification.add(new Alert("Unexpected error: " + response.error, Status.DANGER));
        this.submitted = false;
      }
    });
  }

  /**
   * The change event for assigning the new image
   * @param file The image that the input type file has 
   */
  public onImageChange(file) {
    if (file == null) {
      return;
    }

    if (file.type !== 'image/jpeg') {
      this.notification.add(new Alert("Image has to be jpeg/jpg", Status.DANGER));
      return;
    }

    Util.convertToBase64(file, (data: string, err: boolean) => {
      if (err) {
        this.notification.add(new Alert("Failed to convert image", Status.DANGER));
        return;
      }
      this.submittedImage = data;
    });
  }

  /**
   * Requests the series details from the server
   * Manually assigning the json request data to series for POJO
   * @param id The id of the series to grab
   */
  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.requestAnimeDetails(this.animeService.getObjectId()).subscribe((response: AnimeResponse) => {
      if (response.success) {
        this.series = new AnimeSeries(
          response.animeSeries.id,
          response.animeSeries.englishTitle,
          response.animeSeries.japaneseName,
          response.animeSeries.type,
          this.datePipe.transform(response.animeSeries.releaseDate, 'yyyy-MM-dd'),
          this.datePipe.transform(response.animeSeries.finishDate, 'yyyy-MM-dd'),
          response.animeSeries.synopsis,
          new Picture(response.animeSeries.picture.imageData),
          [new SeasonsEpisodes(response.animeSeries.seasonsEpisodes[0].episodes, 0)]
        )
        this.updateForm();
      } else {
        this.animeService.changeState(this.animeService.getCrudTypes().LIST);
        this.notification.add(new Alert("Invalid anime returning to list", Status.DANGER));
      }
    });
  }

  /**
   * Updates the form with the values from the series
   */
  private updateForm() {
    this.form.patchValue({
      id: this.series.id,
      englishTitle: this.series.englishTitle,
      japaneseTitle: this.series.japaneseName,
      type: this.series.type,
      episodes: this.series.seasonsEpisodes[0].episodes,
      releaseDate: this.datePipe.transform(this.series.releaseDate, 'yyyy-MM-dd'),
      finishDate: this.datePipe.transform(this.series.finishDate, 'yyyy-MM-dd'),
      synopsis: this.series.synopsis,
      picture: this.series.picture
    });
  }

}

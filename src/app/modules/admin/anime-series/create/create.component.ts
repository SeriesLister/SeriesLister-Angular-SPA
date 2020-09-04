import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { Util } from '@app/core/Util';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { Picture } from '@app/shared/models/picture';
import { SeasonsEpisodes } from '@app/shared/models/seasons-episodes';
import { BasicResponse } from '@app/shared/models/responses/basic-response';

@Component({
  selector: 'app-animeseries-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public form: FormGroup;

  public submittedImage: string;

  public submitted: boolean;

  constructor(
      public animeService: AnimeService,
      private fb: FormBuilder,
      private notification: AlertService
    ) {
      this.form = fb.group({
        "englishTitle": [''],
        "type": [''],
        "episodes": [''],
        "releaseDate": [''],
        "finishDate": [''],
        "japaneseTitle": [''],
        "image": [''],
        "synopsis": ['']
      });
  }

  ngOnInit(): void {
  }

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

  public onSubmit() {
    this.submitted = true;
    let newSeries : AnimeSeries = new AnimeSeries(
      -1,
      this.form.get('englishTitle').value,
      this.form.get('japaneseTitle').value,
      this.form.get('type').value,
      this.form.get('releaseDate').value,
      this.form.get('finishDate').value,
      this.form.get('synopsis').value,
      new Picture(this.submittedImage.length ? this.submittedImage : null),
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

    this.animeService.requestAnimeCreation(newSeries).subscribe((response: BasicResponse) => {
      if (response.success) {
        this.notification.add(new Alert('Series has been created!', Status.SUCCESS));
      }
    });
  }

}

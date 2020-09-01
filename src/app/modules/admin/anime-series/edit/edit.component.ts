import { Component, OnInit, Input } from '@angular/core';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { Util } from 'src/app/core/Util';
import { AnimeSeries } from '../../../../shared/models/AnimeSeries';
import { AdminService } from '@app/core/services/online/admin/admin.service';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-animeseries-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  public submitted : boolean = false;

  public form: FormGroup;

  public series: AnimeSeries;

  public submittedImage: string;

  constructor(public animeService: AnimeService, 
    fb: FormBuilder,
    private notification: AlertService,
    private datePipe: DatePipe) {
      this.form = fb.group({
        "id": [''],
        "englishTitle": [''],
        "type": [''],
        "episodes": [''],
        "releaseDate": [''],
        "finishDate": [''],
        "synopsis": [''],
        'image': ['']
      });
    }

  ngOnInit(): void {
    //var id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('edit id: ', this.animeService.getObjectId());
    this.getSeries(this.animeService.getObjectId());
  }

  public onSubmit() {
    // this.submitted = true;
    // var id : number = this.form.get('id').value;
    // var eTitle : string = this.form.get('englishTitle').value;
    // var type : string = this.form.get('type').value;
    // var episodes : number = this.form.get('episodes').value;
    // var releaseDate : string =  this.form.get('releaseDate').value;
    // var finishDate : string = this.form.get('finishDate').value;
    
    // if (this.imageSubmitted && this.newImage == null) {
    //   this.submitted = false;
    //   return;
    // }

    // //var newSeries : AnimeSeries = new AnimeSeries(id, eTitle, type, episodes, null, finishDate, this.newImage == null ? this.series.imageData : this.newImage, null, null);
    // this.submitted = false;

    /**
     * check if series page is the same
     */
    // if (JSON.stringify(this.series) === JSON.stringify(newSeries)) {
    //   this.submitted = false;
    //   return;
    // }

    // this.animeService.editAnimeDetails(newSeries).subscribe(data => {
    //   if (data['result'] === true) {
    //     this.getSeries(newSeries.id);
    //     this.submitted = false;
    //     this.notification.add(new Alert("Changes have been saved... Reloading", Status.SUCCESS));
    //   } else {
    //     this.notification.add(new Alert("Couldn't save changes", Status.DANGER));
    //   }
    // });
  }

  public onImageChange(event) {
    const file = event.target.files[0];
    if (file == null) {
      return;
    }

    if (file.type !== 'image/jpeg') {
      this.notification.add(new Alert("Image has to be jpeg/jpg", Status.DANGER));
      return;
    }

    Util.convertToBase64(event.target.files[0], (data: string, err: boolean) => {
      if (err) {
        this.notification.add(new Alert("Failed to convert image", Status.DANGER));
        return;
      }
      this.submittedImage = data;
    });
  }

  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.requestAnimeDetails(this.animeService.getObjectId()).subscribe((response: AnimeResponse) => {
      if (response.success) {
        this.series = response.animeSeries;
        this.updateForm();
        //this.newImage = null;
        console.log(new Date(this.series.releaseDate).toDateString() );
      }
    });
  }

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

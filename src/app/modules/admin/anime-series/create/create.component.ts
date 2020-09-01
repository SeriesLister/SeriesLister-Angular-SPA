import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { Util } from '@app/core/Util';

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

  public onSubmit() {
    // this.submitted = true;
    // var id : number = 0;
    // var eTitle : string = this.form.get('englishTitle').value;
    // var type : string = this.form.get('type').value;
    // var episodes : number = this.form.get('episodes').value;
    // var releaseDate : string =  this.form.get('releaseDate').value;
    // var finishDate : string = this.form.get('finishDate').value;
    // var newSeries : AnimeSeries = new AnimeSeries(id, eTitle, type, episodes, null, finishDate, null, null, null);
    // console.log(JSON.stringify(newSeries));
    // this.animeService.createAnimeSeries(newSeries).subscribe(data => {
    //   if (data['response']['result'] === true) {
    //     this.submitted = false;
    //     this.router.navigateByUrl('/admin/animeseries/edit/' + data['id']);
    //     this.notification.add(new Alert("Series has been saved... Redirecting to Series", Status.SUCCESS));
    //   } else {
    //     this.notification.add(new Alert("Couldn't save series", Status.DANGER));
    //   }
    // });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { CrudTypes } from '@app/shared/models/crud-types';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-animeseries-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;

  public CrudTypes = CrudTypes;

  constructor(
    public animeService: AnimeService,
    private fb: FormBuilder,
    private notification: AlertService,
    public title: Title) {
      this.form = fb.group({
        "id": [''],
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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AnimeSeries } from '../AnimeSeries';
import { AnimeService } from 'src/app/services/anime.service';
import { AlertService, Status, Alert } from 'src/app/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean;

  constructor(
    private animeService: AnimeService,
    fb: FormBuilder,
    private router: Router,
    private notification: AlertService) {
      this.form = fb.group({
        "id": [''],
        "englishTitle": [''],
        "type": [''],
        "episodes": [''],
        "releaseDate": [''],
        "finishDate": [''],
      });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.submitted = true;
    var id : number = 0;
    var eTitle : string = this.form.get('englishTitle').value;
    var type : string = this.form.get('type').value;
    var episodes : number = this.form.get('episodes').value;
    var releaseDate : string =  this.form.get('releaseDate').value;
    var finishDate : string = this.form.get('finishDate').value;
    var newSeries : AnimeSeries = new AnimeSeries(id, eTitle, type, episodes, releaseDate, finishDate, null);
    console.log(JSON.stringify(newSeries));
    this.animeService.createAnimeSeries(newSeries).subscribe(data => {
      if (data['response']['result'] === true) {
        this.submitted = false;
        this.router.navigateByUrl('/admin/animeseries/edit/' + data['id']);
        this.notification.add(new Alert("Series has been saved... Redirecting to Series", Status.SUCCESS));
      } else {
        this.notification.add(new Alert("Couldn't save series", Status.DANGER));
      }
    });
  }

}

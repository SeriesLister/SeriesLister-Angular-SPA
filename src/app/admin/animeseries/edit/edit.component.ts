import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { AnimeSeries } from '../AnimeSeries';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AlertService, Status, Alert } from 'src/app/services/alert.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  public submitted : boolean = false;

  public form: FormGroup;

  public series: AnimeSeries;

  constructor(private animeService: AnimeService, 
    private route: ActivatedRoute,
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
      });
    }

  ngOnInit(): void {
    var id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.getSeries(id);
  }

  public onSubmit() {
    this.submitted = true;
    var id : number = this.form.get('id').value;
    var eTitle : string = this.form.get('englishTitle').value;
    var type : string = this.form.get('type').value;
    var episodes : number = this.form.get('episodes').value;
    var releaseDate : Date =  this.form.get('releaseDate').value;
    var finishDate : Date = this.form.get('finishDate').value;
    var newSeries : AnimeSeries = new AnimeSeries(id, eTitle, type, episodes, releaseDate, finishDate);

    console.log(this.series);
    console.log(newSeries);

    if (JSON.stringify(this.series) === JSON.stringify(newSeries)) {
      this.submitted = false;
      return;
    }

    this.animeService.postAnimeDetails(newSeries).subscribe(data => {
      if (data['result'] === true) {
        this.getSeries(newSeries.id);
        this.submitted = false;
        this.notification.add(new Alert("Changes have been saved... Reloading", Status.SUCCESS));
      } else {
        this.notification.add(new Alert("Couldn't save changes", Status.DANGER));
      }
    });
  }

  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.getAnimeDetails(id).subscribe(data => {
      this.series = data;
      this.updateForm();
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.series.id,
      englishTitle: this.series.englishTitle,
      type: this.series.type,
      episodes: this.series.episodes,
      releaseDate: this.datePipe.transform(this.series.releaseDate, 'yyyy-MM-dd'),
      finishDate: this.datePipe.transform(this.series.finishDate, 'yyyy-MM-dd')
    });
  }

}

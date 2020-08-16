import { Component, OnInit, Input } from '@angular/core';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { DatePipe } from '@angular/common';
import { Util } from 'src/app/core/Util';
import { AnimeSeries } from '../../../../shared/models/AnimeSeries';
import { AdminService } from '@app/core/services/online/admin/admin.service';

@Component({
  selector: 'app-admin-animeseries-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  public submitted : boolean = false;

  public form: FormGroup;

  public series: AnimeSeries;

  public newImage: string = null;

  private imageSubmitted: boolean;

  @Input()
  private id: number;

  constructor(private animeService: AnimeService, 
    private route: ActivatedRoute,
    fb: FormBuilder,
    private notification: AlertService,
    private datePipe: DatePipe,
    private adminService: AdminService) {
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
    //var id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('edit id: ', this.id);
    this.getSeries(this.id);
  }

  public onSubmit() {
    this.submitted = true;
    var id : number = this.form.get('id').value;
    var eTitle : string = this.form.get('englishTitle').value;
    var type : string = this.form.get('type').value;
    var episodes : number = this.form.get('episodes').value;
    var releaseDate : string =  this.form.get('releaseDate').value;
    var finishDate : string = this.form.get('finishDate').value;
    
    if (this.imageSubmitted && this.newImage == null) {
      this.submitted = false;
      return;
    }

    var newSeries : AnimeSeries = new AnimeSeries(id, eTitle, type, episodes, null, finishDate, this.newImage == null ? this.series.imageData : this.newImage, null, null);
    this.submitted = false;

    /**
     * check if series page is the same
     */
    if (JSON.stringify(this.series) === JSON.stringify(newSeries)) {
      this.submitted = false;
      return;
    }

    this.animeService.editAnimeDetails(newSeries).subscribe(data => {
      if (data['result'] === true) {
        this.getSeries(newSeries.id);
        this.submitted = false;
        this.notification.add(new Alert("Changes have been saved... Reloading", Status.SUCCESS));
      } else {
        this.notification.add(new Alert("Couldn't save changes", Status.DANGER));
      }
    });
  }

  public onImageChanged(event) {
    this.newImage = null;
    if (event.target.files[0] == null) {
      return;
    }

    if (event.target.files[0].type.split("/")[1] !== "jpeg") {
      this.notification.add(new Alert("Image has to be jpeg", Status.DANGER));
      return;
    }
    Util.convertToBase64(event.target.files[0], (data, err) => {
      if (err) {
        this.notification.add(new Alert("Failed to convert image", Status.DANGER));
        return;
      }
      this.newImage = data;
      this.imageSubmitted = true;
    });
  }

  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.getAnimeDetails(id).subscribe(data => {
      this.series = this.animeService.scrubSeries(data, true);
      this.updateForm();
      this.newImage = null;
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

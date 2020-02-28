import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '../AnimeSeries';
import { AnimeService } from 'src/app/services/anime.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, Status, Alert } from 'src/app/services/alert.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public series: AnimeSeries;

  public submitted: boolean = false;

  constructor(private animeService: AnimeService,
    private route: ActivatedRoute,
    private redirect: Router,
    private notification: AlertService) { }

  ngOnInit(): void {
    var id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.getSeries(id);
  }

  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.getAnimeDetails(id).subscribe(data => {
      this.series = this.animeService.scrubSeries(data);
    });
  }

  public delete() {
    this.submitted = true;
    this.animeService.deleteSeries(this.series.id).subscribe(data => {
      if (data['result'] === true) {
        this.notification.add(new Alert("Series: " + this.series.englishTitle + " has been deleted.", Status.SUCCESS));
        this.redirect.navigateByUrl('/admin/animeseries');
      } else {
        this.notification.add(new Alert("Couldn't delete the series", Status.DANGER));
        this.submitted = false;
      }
    });
  }

}

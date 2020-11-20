import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AlertService, Status, Alert } from '@app/core/services/offline/alert.service';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';
import { BasicResponse } from '@app/shared/models/responses/basic-response';

@Component({
  selector: 'app-admin-anime-series-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class AdminAnimeDeleteComponent implements OnInit {

  /**
   * The current animeseries
   */
  public series: AnimeSeries;

  /**
   * If the form was submitted
   */
  public submitted: boolean = false;

  constructor(
    public animeService: AnimeService,
    private notification: AlertService
  ) { }

  ngOnInit(): void {
    this.getSeries(this.animeService.getObjectId());
  }

  /**
   * Gets the series with the id specifiecd
   * @param id the id of the series
   */
  private getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }
    this.animeService.requestAnimeDetails(id).subscribe((response: AnimeResponse) => {
      if (response.success) {
        this.series = response.animeSeries;
      }
    });
  }

  /**
   * When the user presses delete
   */
  public delete() {
    this.submitted = true;
    this.animeService.requestAnimeDeletion(this.animeService.getObjectId()).subscribe((response: BasicResponse) => {
      if (response.success === true) {
        this.notification.add(new Alert("Series: " + this.series.englishTitle + " has been deleted.", Status.SUCCESS));
        this.animeService.changeState(this.animeService.getCrudTypes().LIST);
      } else {
        this.notification.add(new Alert("Couldn't delete the series", Status.DANGER));
        this.notification.add(new Alert(response.error, Status.DANGER));
        this.submitted = false;
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '../../../../shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';
import { BasicResponse } from '@app/shared/models/responses/basic-response';

@Component({
  selector: 'app-admin-anime-series-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public series: AnimeSeries;

  public submitted: boolean = false;

  constructor(
    public animeService: AnimeService,
    private notification: AlertService
  ) { }

  ngOnInit(): void {
    this.getSeries(this.animeService.getObjectId());
  }

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

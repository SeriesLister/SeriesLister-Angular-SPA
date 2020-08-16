import { Component, OnInit, Input } from '@angular/core';
import { AnimeSeries } from '../../../../shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-animeseries-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  public series: AnimeSeries;

  @Input()
  private id: number;

  constructor(private animeService: AnimeService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    //var id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    this.getSeries(this.id);
  }

  public getSeries(id: number = 0) {
    if (id < 1) {
      return;
    }

    this.animeService.getAnimeDetails(id).subscribe(data => {
      this.series = this.animeService.scrubSeries(data);
    });
  }

}

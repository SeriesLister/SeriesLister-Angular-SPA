import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { CrudTypes } from '@app/shared/models/crud-types';
import { AnimeListedResponse } from '@app/shared/models/responses/impl/anime/anime-listed-response';

@Component({
  selector: 'app-animeseries-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  series: AnimeSeries[] = [];
  lastPage: number;
  currentPage: number = 1;

  public CrudTypes = CrudTypes;

  constructor(public animeService: AnimeService) { }

  ngOnInit(): void {
    this.getSeries();
  }

  public getPage(page: number = 1) {
    this.getSeries(page);
  }

  public getSeries(page: number = 1) {
    if (page > this.lastPage || page < 1) {
      return;
    }

    this.currentPage = page;
    this.animeService.requestListedAnime(page).subscribe((response: AnimeListedResponse) => {
      if (response.success) {
        this.lastPage = response.lastPage;
        console.log('series', response.animeSeries[0].seasonEpisodes);
        this.series = response.animeSeries;
        console.log(this.series[0].seasonEpisodes[0]);
      }
    });
    // this.animeService.getAnimeSeries(page).subscribe(data => {
    //   this.lastPage = data['lastPage'];
    //   this.series = this.animeService.scrubSeriesA(data['animeSeries']);
    // }, err => {
    //   console.log('got an error on the index');
    // });
  }

}

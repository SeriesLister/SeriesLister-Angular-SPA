import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AnimeListedResponse } from '@app/shared/models/responses/impl/anime/anime-listed-response';
import { Util } from '@app/core/Util';

@Component({
  selector: 'app-admin-anime-series-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class AdminAnimeListComponent implements OnInit {

  /**
   * An array containing the anime series
   */
  public series: AnimeSeries[] = [];

  /**
   * The total pages of the pagination
   */
  public totalPages: number;

  /**
   * The current page we're on
   */
  public currentPage: number = 1;

  constructor(public animeService: AnimeService) { }

  ngOnInit(): void {
    this.getSeries();
  }

  /**
   * Used for the output of the pagination buttons
   * @param page the page number to change to
   */
  public changePage(page: number = 1): void {
    this.getSeries(page);
  }

  /**
   * Gets the series based off the page number requested
   * @param page The page number
   */
  private getSeries(page: number = 1): void {
    if (page > this.totalPages || page < 1) {
      return;
    }

    this.animeService.requestListedAnime(page).subscribe((response: AnimeListedResponse) => {
      if (response.success) {
        this.totalPages = response.totalPages;
        this.series = response.animeSeries;
        this.currentPage = page;
      }
    });
  }

}

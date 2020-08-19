import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';
import { AnimeResponse } from '@app/shared/models/responses/impl/anime/anime-response';

@Component({
  selector: 'app-admin-anime-series-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class AdminAnimeDetailsComponent implements OnInit {

  private series: AnimeSeries = null;

  constructor(public animeService: AnimeService) { }

  ngOnInit(): void {
    this.getSeries(this.animeService.getObjectId());
  }

  private getSeries(id: number = 0): void {
    if (id < 1) {
      return;
    }

    this.animeService.requestAnimeDetails(id).subscribe((response: AnimeResponse) => {
      if (response.success) {
        this.series = response.animeSeries;
      }
    });
  }

  public isSeriesReady() : boolean {
    return this.series !== null;
  }

  public getReleaseDate() : string {
    if (this.series.releaseDate !== undefined) {
      return this.animeService.ParseDate(this.series.releaseDate);
    }

    return 'N/A';
  }

  public getFinishDate(): string {
    if (this.series.finishDate !== undefined) {
      return this.animeService.ParseDate(this.series.finishDate);
    }

    return 'N/A';
  }

  public getType(): string {
    if (this.series.type !== undefined) {
      return this.series.type;
    }

    return 'N/A';
  }

  public getEnglishTitle(): string {
    if (this.series.englishTitle != undefined) {
      return this.series.englishTitle;
    }

    return 'N/A';
  }

  public getJapaneseTitle(): string {
    if (this.series.japaneseName != undefined) {
      return this.series.japaneseName;
    }

    return 'N/A';
  }

  public getEpisodes(): number {
    if (this.series.seasonsEpisodes[0].episodes > -1) {
      return this.series.seasonsEpisodes[0].episodes;
    }

    return 0;
  }

  public getSeriesId(): number {
    return this.series.id;
  }

}

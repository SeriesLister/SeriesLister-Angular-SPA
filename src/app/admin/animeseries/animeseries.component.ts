import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { AnimeSeries } from './AnimeSeries';

@Component({
  selector: 'app-animeseries',
  templateUrl: './animeseries.component.html',
  styleUrls: ['./animeseries.component.css']
})
export class AnimeseriesComponent implements OnInit {

  series: AnimeSeries[] = [];
  lastPage: number;
  currentPage: number = 1;

  constructor(private animeService: AnimeService) {
  }

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
    this.animeService.getAnimeSeries(page).subscribe(data => {
      this.series = [];
      this.lastPage = data['lastPage'];
      for (let i = 0; i < data['animeSeries'].length; i++) {
        let element = data['animeSeries'][i];
        this.series.push(new AnimeSeries(element['id'], element['englishTitle'], element['type'], element['episodes'], 
          this.getDate(new Date(element['releaseDate'])), this.getDate(new Date(element['finishDate']))));
      }
    });
  }

  public getDate(date: Date): string {
    var formattedDate: string[] = date.toISOString().split('T');
    return formattedDate[0];
  }

}

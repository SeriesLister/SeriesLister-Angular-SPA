import { Component, OnInit } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { AnimeSeries } from './AnimeSeries';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { Routes } from '@angular/router';
import { error } from 'protractor';

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
      console.log("GOT THE RESPONSE BACK FOR INDEX");
      this.lastPage = data['lastPage'];
      this.series = this.animeService.scrubSeriesA(data['animeSeries']);
    }, err => {
      console.log('got an error on the index');
    });
  }

}

export const animeManagementRoutes: Routes = [
  { path: 'admin/animeseries', component: AnimeseriesComponent },
  { path: 'admin/animeseries/edit/:id', component: EditComponent },
  { path: 'admin/animeseries/details/:id', component: DetailsComponent },
  { path: 'admin/animeseries/delete/:id', component: DeleteComponent },
  { path: 'admin/animeseries/create', component: CreateComponent },
];

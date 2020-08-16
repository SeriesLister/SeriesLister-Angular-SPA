import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnimeSeries } from '@app/shared/models/AnimeSeries';
import { AnimeService } from '@app/core/services/online/anime.service';
import { AdminService } from '@app/core/services/online/admin.service';
import { CrudTypes } from '@app/shared/models/crud-types';

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

  @Output()
  public id = new EventEmitter<number>();

  constructor(private animeService: AnimeService, public adminService: AdminService) { }

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
      this.lastPage = data['lastPage'];
      this.series = this.animeService.scrubSeriesA(data['animeSeries']);
    }, err => {
      console.log('got an error on the index');
    });
  }

  public changeCrudType(state: CrudTypes) {
    this.adminService.changeState(state);
  }

}

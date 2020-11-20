import { Component, OnInit } from '@angular/core';
import { CrudTypes } from '@app/shared/models/crud-types';
import { AnimeService } from '@app/core/services/online/admin/impl/anime.service';

@Component({
  selector: 'app-admin-anime-series',
  templateUrl: './animeseries.component.html',
  styleUrls: ['./animeseries.component.css'],
})
export class AdminAnimeStateComponent implements OnInit {

  /**
   * The current state were on
   */
  public currentState: CrudTypes;

  constructor(public animeService: AnimeService) {
  }

  ngOnInit(): void {
    this.animeService.getStateSubject().subscribe((updated: CrudTypes) => {
        this.currentState = updated;
    });
    this.animeService.changeState(CrudTypes.LIST);
  }

  ngOnDestroy(): void {
    this.animeService.getStateSubject().unsubscribe();
  }

}

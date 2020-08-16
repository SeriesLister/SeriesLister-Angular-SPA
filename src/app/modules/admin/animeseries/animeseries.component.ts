import { Component, OnInit } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { Routes } from '@angular/router';
import { CrudTypes } from '@app/shared/models/crud-types';
import { AdminService } from '@app/core/services/online/admin/admin.service';

@Component({
  selector: 'app-admin-animeseries',
  templateUrl: './animeseries.component.html',
  styleUrls: ['./animeseries.component.css']
})
export class AnimeseriesComponent implements OnInit {

  public state: CrudTypes;
  public CrudTypes = CrudTypes;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.stateEmitter.subscribe((state: CrudTypes) => {
      this.state = state;
    });
    this.adminService.stateEmitter.next(CrudTypes.LIST);
  }

  ngOnDestroy(): void {
    this.adminService.stateEmitter.unsubscribe();
  }

  public checkState(state: CrudTypes): boolean {
    return this.state === state;
  }

}

export const animeManagementRoutes: Routes = [
  { path: 'admin/animeseries', component: AnimeseriesComponent },
  { path: 'admin/animeseries/edit/:id', component: EditComponent },
  { path: 'admin/animeseries/details/:id', component: DetailsComponent },
  { path: 'admin/animeseries/delete/:id', component: DeleteComponent },
  { path: 'admin/animeseries/create', component: CreateComponent },
];

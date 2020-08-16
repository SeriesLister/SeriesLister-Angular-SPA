import { Component, OnInit } from '@angular/core';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { DeleteComponent } from './delete/delete.component';
import { CreateComponent } from './create/create.component';
import { Routes } from '@angular/router';
import { CrudTypes } from '@app/shared/models/crud-types';
import { AdminService } from '@app/core/services/online/admin.service';

@Component({
  selector: 'app-admin-animeseries',
  templateUrl: './animeseries.component.html',
  styleUrls: ['./animeseries.component.css']
})
export class AnimeseriesComponent implements OnInit {

  public state: CrudTypes;
  public CrudTypes = CrudTypes;

  public id: number;

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.stateManager.subscribe((state: CrudTypes) => {
      this.state = state;
    });
    this.adminService.stateManager.next(CrudTypes.LIST);
  }

  ngOnDestroy(): void {
    this.adminService.stateManager.unsubscribe();
  }

  public isStateList(): boolean {
    return this.state === CrudTypes.LIST;
  }

  public isStateCreate(): boolean {
    return this.state === CrudTypes.CREATE;
  }

  public changeId(id: number): void {
    this.id = id;
    console.log('id change: ', id);
  }

}

export const animeManagementRoutes: Routes = [
  { path: 'admin/animeseries', component: AnimeseriesComponent },
  { path: 'admin/animeseries/edit/:id', component: EditComponent },
  { path: 'admin/animeseries/details/:id', component: DetailsComponent },
  { path: 'admin/animeseries/delete/:id', component: DeleteComponent },
  { path: 'admin/animeseries/create', component: CreateComponent },
];

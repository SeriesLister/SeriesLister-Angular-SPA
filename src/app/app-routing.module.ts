import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { AnimeseriesComponent } from './admin/animeseries/animeseries.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { EditComponent } from './admin/animeseries/edit/edit.component';
import { DetailsComponent } from './admin/animeseries/details/details.component';
import { DeleteComponent } from './admin/animeseries/delete/delete.component';
import { CreateComponent } from './admin/animeseries/create/create.component';
import { UsermanagerComponent } from './admin/usermanager/usermanager.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/animeseries', component: AnimeseriesComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'admin/animeseries/edit/:id', component: EditComponent },
  { path: 'admin/animeseries/details/:id', component: DetailsComponent },
  { path: 'admin/animeseries/delete/:id', component: DeleteComponent },
  { path: 'admin/animeseries/create', component: CreateComponent },
  { path: 'admin/usermanager', component: UsermanagerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

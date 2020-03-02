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
import { UserManagerEditComponent } from './admin/usermanager/edit/edit.component';
import { UserManagerDetailsComponent } from './admin/usermanager/details/details.component';
import { UserManagerDeleteComponent } from './admin/usermanager/delete/delete.component';

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
  { path: 'admin/usermanager/edit/:id', component: UserManagerEditComponent },
  { path: 'admin/usermanager/details/:id', component: UserManagerDetailsComponent },
  { path: 'admin/usermanager/delete/:id', component: UserManagerDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

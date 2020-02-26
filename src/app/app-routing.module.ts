import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { AnimeseriesComponent } from './admin/animeseries/animeseries.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { EditComponent } from './admin/animeseries/edit/edit.component';
import { DetailsComponent } from './admin/animeseries/details/details.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/animeseries', component: AnimeseriesComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'admin/animeseries/edit/:id', component: EditComponent },
  { path: 'admin/animeseries/details/:id', component: DetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

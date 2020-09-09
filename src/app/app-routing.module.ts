import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LandingComponent } from './modules/landing/landing.component';
import { AdminComponent } from './modules/admin/admin.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { userManagerRoutes } from './modules/admin/usermanager/usermanager.component';
import { AdminAnimeStateComponent } from './modules/admin/anime-series/animeseries.component';
import { dashboardRoutes } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  
  /** 
   * ADMIN ROUTES  
   */
  { path: 'admin', component: AdminComponent },
  { path: 'admin/animeseries', component: AdminAnimeStateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    RouterModule.forChild(userManagerRoutes),
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LandingComponent } from './modules/landing/landing.component';
import { AdminComponent } from './modules/admin/admin.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { userManagerRoutes } from './modules/admin/usermanager/usermanager.component';
import { animeManagementRoutes } from './modules/admin/animeseries/animeseries.component';
import { dashboardRoutes } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'admin', component: AdminComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), 
    RouterModule.forChild(userManagerRoutes),
    RouterModule.forChild(animeManagementRoutes),
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { animeManagementRoutes } from './admin/animeseries/animeseries.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { userManagerRoutes } from './admin/usermanager/usermanager.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { dashboardRoutes } from './dashboard/dashboard.component';

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

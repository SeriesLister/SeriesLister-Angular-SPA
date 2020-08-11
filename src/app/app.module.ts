import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { LandingComponent } from './modules/landing/landing.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AnimeseriesComponent } from './modules/admin/animeseries/animeseries.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { EditComponent } from './modules/admin/animeseries/edit/edit.component';
import { DetailsComponent } from './modules/admin/animeseries/details/details.component';
import { PagebuttonsComponent } from './shared/components/pagebuttons/pagebuttons.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { CreateComponent } from './modules/admin/animeseries/create/create.component';
import { DeleteComponent } from './modules/admin/animeseries/delete/delete.component';
import { DatePipe } from '@angular/common';
import { UsermanagerComponent } from './modules/admin/usermanager/usermanager.component';
import { UserManagerEditComponent } from './modules/admin/usermanager/edit/edit.component';
import { UserManagerDetailsComponent } from './modules/admin/usermanager/details/details.component';
import { UserManagerDeleteComponent } from './modules/admin/usermanager/delete/delete.component';
import { LoginComponent } from './modules/forms/login/login.component';
import { RegisterComponent } from './modules/forms/register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { AddComponent } from './modules/dashboard/add/add.component';
import { EditDashbaordComponent } from './modules/dashboard/edit/edit.component'
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptor} from '@app/core/interceptors/api.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    AdminComponent,
    AnimeseriesComponent,
    PrivacyComponent,
    EditComponent,
    DetailsComponent,
    PagebuttonsComponent,
    NotificationComponent,
    CreateComponent,
    DeleteComponent,
    UsermanagerComponent,
    UserManagerEditComponent,
    UserManagerDetailsComponent,
    UserManagerDeleteComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddComponent,
    EditDashbaordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe, 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

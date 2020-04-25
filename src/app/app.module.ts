import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { AdminComponent } from './admin/admin.component';
import { AnimeseriesComponent } from './admin/animeseries/animeseries.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { EditComponent } from './admin/animeseries/edit/edit.component';
import { DetailsComponent } from './admin/animeseries/details/details.component';
import { PagebuttonsComponent } from './shared/components/pagebuttons/pagebuttons.component';
import { NotificationComponent } from './notification/notification.component';
import { CreateComponent } from './admin/animeseries/create/create.component';
import { DeleteComponent } from './admin/animeseries/delete/delete.component';
import { DatePipe } from '@angular/common';
import { UsermanagerComponent } from './admin/usermanager/usermanager.component';
import { UserManagerEditComponent } from './admin/usermanager/edit/edit.component';
import { UserManagerDetailsComponent } from './admin/usermanager/details/details.component';
import { UserManagerDeleteComponent } from './admin/usermanager/delete/delete.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddComponent } from './dashboard/add/add.component';
import { EditDashbaordComponent } from './dashboard/edit/edit.component'
import { TokenInterceptorService } from './http/interceptors/TokenInterceptorService';
import { JWTokens } from './jwt/JWTokens';

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
    ReactiveFormsModule
  ],
  providers: [DatePipe, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

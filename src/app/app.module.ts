import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { LandingComponent } from './modules/landing/landing.component';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminAnimeStateComponent } from './modules/admin/anime-series/animeseries.component';
import { PrivacyComponent } from './modules/privacy/privacy.component';
import { EditComponent } from './modules/admin/anime-series/edit/edit.component';
import { AdminAnimeDetailsComponent } from './modules/admin/anime-series/details/details.component';
import { PaginationButtonsComponent } from './shared/components/paginationbuttons/pagination-buttons.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { CreateComponent } from './modules/admin/anime-series/create/create.component';
import { AdminAnimeDeleteComponent } from './modules/admin/anime-series/delete/delete.component';
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
import { TokenInterceptor } from './core/interceptors/token-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiInterceptor } from '@app/core/interceptors/api-interceptor';
import { CatchInterceptor } from '@app/core/interceptors/catch-interceptor';
import { AdminAnimeListComponent } from './modules/admin/anime-series/list/list.component';
import { ThemeService } from './core/services/offline/theme.service';
import { StorageService } from './core/services/offline/storage.service';
import { ButtonComponent } from './shared/components/button/button.component';

/**
 * Material imports
 */
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NavbarComponent } from './core/navs/navbar/navbar.component';
import { SidenavComponent } from './core/navs/side-nav/side-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingComponent,
    AdminComponent,
    AdminAnimeStateComponent,
    PrivacyComponent,
    EditComponent,
    AdminAnimeDetailsComponent,
    PaginationButtonsComponent,
    NotificationComponent,
    CreateComponent,
    AdminAnimeDeleteComponent,
    UsermanagerComponent,
    UserManagerEditComponent,
    UserManagerDetailsComponent,
    UserManagerDeleteComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddComponent,
    EditDashbaordComponent,
    AdminAnimeListComponent,
    ButtonComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  providers: [
    DatePipe,
    ThemeService,
    StorageService,
    {provide: APP_INITIALIZER, useFactory: themeFactory, deps: [ThemeService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CatchInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function themeFactory(themeService: ThemeService) {
  return () => themeService.setThemeOnStart();
}
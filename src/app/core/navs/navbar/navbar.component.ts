import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/online/authentication.service';
import { ThemeService, ThemeType } from '@app/core/services/offline/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public ThemeType = ThemeType;

  constructor(public auth: AuthService, public themeService: ThemeService) { 
  }

  ngOnInit(): void {
  }

}

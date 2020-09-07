import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/online/authentication.service';
import { ThemeService } from '../services/offline/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private themeToggleService: ThemeService) { 
  }

  ngOnInit(): void {
  }

  public transition() {
    this.themeToggleService.toggle();
  }

}

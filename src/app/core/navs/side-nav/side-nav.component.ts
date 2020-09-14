import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SidenavComponent {

  @ViewChild('sidenav')
  private sidenav: MatSidenav;

  constructor() { }

  public toggleSidenav() {
    if (this.sidenav == (null || undefined)) {
      return;
    }

    this.sidenav.toggle();
  }

  public isSidenavToggled() {
    if (this.sidenav == (null || undefined)) {
      return false;
    }

    return this.sidenav.opened;
  }

}

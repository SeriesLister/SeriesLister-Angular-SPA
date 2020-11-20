import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimeSeries } from '../../shared/models/AnimeSeries';
import { Routes, Router } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditDashbaordComponent } from './edit/edit.component';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public series: AnimeSeries;
  
  public isClicked: boolean;

  public seriesId: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToEdit() {
    console.log('trying to edit');
    this.router.navigateByUrl("/dashboard/edit");
  }

  clicked(): void {
    this.isClicked = !this.isClicked;
  }

}

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/add', component: AddComponent },
  { path: 'dashboard/edit', component: EditDashbaordComponent }
]

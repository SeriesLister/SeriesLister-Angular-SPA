import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '../../shared/models/AnimeSeries';
import { Routes, Router } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditDashbaordComponent } from './edit/edit.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public series: AnimeSeries;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public goToEdit() {
    console.log('trying to edit');
    this.router.navigateByUrl("/dashboard/edit");
  }

}

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/add', component: AddComponent },
  { path: 'dashboard/edit', component: EditDashbaordComponent }
]

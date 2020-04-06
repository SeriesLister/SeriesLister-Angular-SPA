import { Component, OnInit } from '@angular/core';
import { AnimeSeries } from '../admin/animeseries/AnimeSeries';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public series: AnimeSeries;
  
  constructor() { }

  ngOnInit(): void {
  }

}

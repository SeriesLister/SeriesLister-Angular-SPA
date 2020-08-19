import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from 'src/app/core/services/offfline/alert.service';
import { Util } from 'src/app/core/Util';
import { AnimeSeries } from 'src/app/shared/models/AnimeSeries';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditDashbaordComponent implements OnInit {

  public isViewingSynopsis;

  public series: AnimeSeries;

  public util: Util = new Util();

  constructor(private router: Router, private alert: AlertService) { }

  ngOnInit(): void {
    //this.series = new AnimeSeries(0, "Charlotte", "TV", null, 1, "2015", "2015", 
    //null, "While on the surface Yuu Otosaka appears to be just another charming and intelligent teenager, he has a secret—he has the ability to slip into people's minds and fully control their body for five seconds at a time. Yuu has been using this skill for years to gain the highest grades, which allowed him to enter a prestigious high school. When the enigmatic Nao Tomori catches Yuu using his power, she coerces him and his sister Ayumi into transferring to Hoshinoumi Academy, a school for students with supernatural abilities. The student council of the school, led by Nao, is tasked with secretly tracking down adolescents who abuse their powers. Yuu is forced to join the student council and together, they face formidable challenges that bring him closer to the shocking truth that his own, seemingly incomplete ability, might be more powerful than he could have ever imagined. An original story from Jun Maeda, creator of Angel Beats and Clannad, Charlotte explores the supernatural lives of these teenagers and the price they must pay for being special.")
  }

  public goToDashboard() {
    this.router.navigateByUrl("/dashboard");
  }

  public saveSeries() {
    this.alert.add(new Alert("Saved series", Status.SUCCESS));
    //this.goToDashboard();
  }

  public getSynopsis(short : boolean) : string {
    return !short ? this.series.synopsis : (this.series.synopsis.substring(0, 106) + '...');
  }

}

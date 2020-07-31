import { Component, OnInit } from '@angular/core';
import { UserManage } from '../Users';
import { ActivatedRoute } from '@angular/router';
import { UsermanagerService } from 'src/app/http/services/usermanager.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class UserManagerDetailsComponent implements OnInit {

  public user: UserManage;

  constructor(private service: UsermanagerService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    var id : string = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  public getUser(id: string = null) {
    if (id === null) {
      return;
    }

    this.service.getUser(id).subscribe(data => {
      this.user = data;
    });
  }

}

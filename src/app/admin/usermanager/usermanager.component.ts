import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from 'src/app/services/usermanager.service';
import { User } from './Users';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {

  currentPage = 1;
  users: User[];
  lastPage: number;

  constructor(private service: UsermanagerService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public getPage(page: number = 1) {
    this.getUsers(page);
  }

  public getUsers(page: number = 1) {
    if (page > this.lastPage || page < 1) {
      return;
    }

    this.currentPage = page;
    this.service.getUsers(page).subscribe(data => {
      this.lastPage = data['totalPages'];
      this.users = data['userModel'];
    });
  }

}

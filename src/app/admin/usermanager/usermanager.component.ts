import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from 'src/app/services/usermanager.service';
import { UserManage } from './Users';
import { Routes } from '@angular/router';
import { UserManagerEditComponent } from './edit/edit.component';
import { UserManagerDetailsComponent } from './details/details.component';
import { UserManagerDeleteComponent } from './delete/delete.component';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {

  currentPage = 1;
  users: UserManage[];
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

export const userManagerRoutes: Routes = [
  { path: 'admin/usermanager', component: UsermanagerComponent },
  { path: 'admin/usermanager/edit/:id', component: UserManagerEditComponent },
  { path: 'admin/usermanager/details/:id', component: UserManagerDetailsComponent },
  { path: 'admin/usermanager/delete/:id', component: UserManagerDeleteComponent },
];
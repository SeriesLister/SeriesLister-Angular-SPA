import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, Status, Alert } from 'src/app/core/services/offfline/alert.service';
import { UserManage } from '../Users';
import { UsermanagerService } from 'src/app/http/services/usermanager.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class UserManagerDeleteComponent implements OnInit {

  public user: UserManage;

  public submitted : boolean = false;

  constructor(private route: ActivatedRoute,
    private redirect: Router,
    private notification: AlertService,
    private service: UsermanagerService) { }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
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

  public delete() {
    this.submitted = true;
    this.service.deleteUser(this.user.id).subscribe(data => {
      if (data['result'] === true) {
        this.notification.add(new Alert("User: " + this.user.email + " has been deleted.", Status.SUCCESS));
        this.redirect.navigateByUrl('/admin/usermanager');
      } else {
        this.notification.add(new Alert("Couldn't delete the user", Status.DANGER));
        this.submitted = false;
      }
    });
  }

}

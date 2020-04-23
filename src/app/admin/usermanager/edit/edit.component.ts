import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from 'src/app/http/services/usermanager.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserManage } from '../Users';
import { AlertService, Status, Alert } from 'src/app/http/services/alert.service';

@Component({
  selector: 'app-usermanager-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class UserManagerEditComponent implements OnInit {

  public submitted : boolean = false;

  public form: FormGroup;

  public user: UserManage;

  constructor(private service: UsermanagerService,
    fb: FormBuilder,
    private route: ActivatedRoute,
    private notification: AlertService) { 
      this.form = fb.group({
        "id": [''],
        "displayName": [''],
        "permissions": [''],
        "email": [''],
      });
    }

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  public onSubmit() {
    this.submitted = true;
    var id : string = this.form.get('id').value;
    var email : string = this.form.get('email').value;
    var displayName : string = this.form.get('displayName').value;
    var permissions : string[] = this.form.get('permissions').value;
    var newUser : UserManage = new UserManage(id, email, displayName, permissions);

    if (JSON.stringify(this.user) === JSON.stringify(newUser)) {
      this.submitted = false;
      return;
    }

    this.service.editUser(newUser).subscribe(data => {
      if (data['result'] === true) {
        this.getUser(newUser.id);
        this.submitted = false;
        this.notification.add(new Alert("Changes have been saved... Reloading", Status.SUCCESS));
      } else {
        this.notification.add(new Alert("Couldn't save changes", Status.DANGER));
      }
    });
  }

  public getUser(id: string = null) {
    if (id === null) {
      return;
    }

    this.service.getUser(id).subscribe(data => {
      this.user = data;
      this.updateForm();
    });
  }

  private updateForm() {
    this.form.patchValue({
      id: this.user.id,
      displayName: this.user.displayName,
      permissions: this.user.permissions,
      email: this.user.email,
    });
  }

}

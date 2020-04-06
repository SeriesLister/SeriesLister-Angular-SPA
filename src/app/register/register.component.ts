import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { User } from '../User';
import { AlertService, Alert, Status } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public submitted: boolean = false;
  public form: FormGroup;

  public emailError : string = "";
  public passwordErrors : string[] = [];
  public displayNameError : string = "";

  constructor(fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private alert: AlertService) {
      this.form = fb.group({
        "email": [''],
        "password": [''],
        "cpassword": [''],
        "displayName": ['']
      });
    }

  ngOnInit(): void {
    this.service.redirectOnLogin();
  }

  //TODO: add more front-end checking
  public onSubmit() : void {
    this.passwordErrors = [];
    this.emailError = "";
    this.displayNameError = "";

    let email = this.form.get('email').value;
    let password = this.form.get('password').value;
    let cpassword = this.form.get('cpassword').value;
    let displayName = this.form.get('displayName').value;

    if (password !== cpassword) {
      this.passwordErrors.push("Passwords don't match");
      return;
    }

    this.service.register(email, displayName, password).subscribe(data => {
      this.router.navigateByUrl("/login");
      this.alert.add(new Alert("Account was successfully created. Please login.", Status.SUCCESS));
    }, error => {
      let errors : string[] = error.error.detail.split(" : ");
      this.appendErrors(errors);
    });
  }

  private appendErrors(errors : string[]) : void {
    errors.forEach(element => {
      if (element.includes("Passwords")) {
        this.passwordErrors.push(element);
      } else if (element.includes("Email")) {
        this.emailError = element;
      } else if (element.includes("User name")) {
        this.displayNameError = element;
      }
    });
  }

}
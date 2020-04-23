import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from '../http/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public submitted: boolean = false;
  public form: FormGroup;
  public errorMessage : string = "";
  public emailError : string = "";

  constructor(
    fb: FormBuilder,
    private service: AuthService,
    private router: Router
    ) { 
      this.form = fb.group({
        "email": [''],
        "password": ['']
      })

    }

  ngOnInit(): void {
    this.service.redirectOnLogin();
  }

  public onSubmit() {
    //this.submitted = true;
    this.errorMessage = "";
    this.emailError = "";
    var email : string = this.form.get('email').value;
    var password : string = this.form.get('password').value;
    this.service.login(email, password).subscribe(data => {
      this.router.navigateByUrl('/');
    }, error => {
      if (error['status'] === 400) {
        this.emailError = 'Input a valid email';
      } else {
        this.errorMessage = error['error']['detail'];
      }
    });    
  }
  
}

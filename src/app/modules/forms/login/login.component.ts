import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, EmailValidator } from '@angular/forms';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/online/auth-service.service';
import { LoginResponse } from 'src/app/shared/models/responses/impl/loginresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * If the user pressed login
   */
  public submitted: boolean = false;

  /**
   * The login form group
   */
  public loginForm: FormGroup;

  /**
   * Message that the server sends if invalid
   */
  public error: string = "";

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    public router: Router
    ) { 
      this.loginForm = fb.group({
        email: "",
        password: "",
        remember: false
      })

    }

  ngOnInit(): void {
    this.service.redirectOnLogin();
  }

  public onSubmit() {
    this.submitted = true;
    this.error = '';
    var email : string = this.loginForm.get('email').value;
    var password : string = this.loginForm.get('password').value;
    var remember: boolean = this.loginForm.get('remember').value;
    this.service.login(email, password, remember).subscribe((response: LoginResponse) => {
      //this.router.navigateByUrl('/');
      if (!response.success) {
        this.submitted = false;
        this.error = response.error;
      }
    });
  }
  
}

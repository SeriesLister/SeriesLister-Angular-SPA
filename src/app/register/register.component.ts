import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public submitted: boolean = false;
  public form: FormGroup;

  constructor(fb: FormBuilder,
    private service: AuthService,
    private router: Router) {
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

  public onSubmit() : void {

  }

}

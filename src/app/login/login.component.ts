import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { error } from 'protractor';

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
    private service: AuthServiceService
    ) { 
      this.form = fb.group({
        "email": [''],
        "password": ['']
      })

    }

  ngOnInit(): void {
  }

  public onSubmit() {
    //this.submitted = true;
    this.errorMessage = "";
    this.emailError = "";
    var email : string = this.form.get('email').value;
    var password : string = this.form.get('password').value;
    this.service.login(email, password).subscribe(data => {
    }, error => {
      if (error['status'] === 400) {
        this.emailError = 'Input a valid email';
      } else {
        this.errorMessage = error['error']['detail'];
      }
    });
  }
  
}

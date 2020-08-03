import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from 'src/app/core/services/offfline/alert.service';
import { AuthService } from 'src/app/core/services/online/auth-service.service';

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
    public router: Router,
    private alert: AlertService) {
      this.form = fb.group({
        "email": new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        "password": new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),

        ]),
        "confirmPassword": new FormControl('', [
          Validators.required
        ]),
        "displayName": new FormControl('', [
          Validators.minLength(4),
          Validators.maxLength(16),
          Validators.required,
        ])
      });
    }

  ngOnInit(): void {
    this.service.redirectOnLogin();
  }

  //TODO: add more front-end checking
  public onSubmit() : void {
    // this.passwordErrors = [];
    // this.emailError = "";
    // this.displayNameError = "";

    // let email = this.form.get('email').value;
    // let password = this.form.get('password').value;
    // let cpassword = this.form.get('cpassword').value;
    // let displayName = this.form.get('displayName').value;

    // if (password !== cpassword) {
    //   this.passwordErrors.push("Passwords don't match");
    //   return;
    // }

    // this.service.register(email, displayName, password).subscribe(data => {
    //   this.router.navigateByUrl("/login");
    //   this.alert.add(new Alert("Account was successfully created. Please login.", Status.SUCCESS));
    // }, error => {
    //   let errors : string[] = error.error.detail.split(" : ");
    //   this.appendErrors(errors);
    // });
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

  minlength(nameRe: RegExp) : ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const length = nameRe.test(control.value);
      return length ? {length: {value: control.value}} : null;
    }
  }

  get Password() {
    console.log(this.form.get('password').errors.pattern);
    return this.form.get('password');
  }

}

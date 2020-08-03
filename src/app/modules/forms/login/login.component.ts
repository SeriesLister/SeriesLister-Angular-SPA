import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
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
    public router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl(''),
      password: new FormControl('', [
      ]),
      remember: false
    });
  }

  ngOnInit(): void {
    this.service.redirectOnLogin();
  }

  public onSubmit() {
    this.submitted = true;
    this.error = '';
    var email : string = this.email.value;
    var password : string = this.password.value;
    var remember: boolean = this.remember.value;
    
    if (this.isFormValid(email, password)) {
      this.submitted = false;
      return;
    }

    this.service.login(email, password, remember).subscribe((response: LoginResponse) => {
      //this.router.navigateByUrl('/');
      if (!response.success) {
        this.submitted = false;
        this.error = response.error;
      }
    });
  }

  /**
   * Checks if email and password legnths are zero or less
   * Returns true are setting errors
   * @param email - The email input from the form
   * @param password - The password input from the form - 20px
   */
  isFormValid(email: string, password: string): boolean {
    if (email.length <= 0) {
      this.email.setErrors({ required: true });
    }

    if (password.length <= 0) {
      this.password.setErrors({required: true});
    }

    return this.password.hasError("required") || this.email.hasError("required");
  }

  /**
   * Checks if the length of the form value is greater than zero
   * @param checkIndex The form input to check
   */
  isInvalid(name: string): boolean {
    let formInput: AbstractControl = this.loginForm.get(name);
    return formInput.value.length <= 0 && formInput.hasError('required');
  }

  /**
   * Checks the forms value, and sets or removes errors
   * @param name The form input to check
   */
  validateLegnth(name: string): void {
    let formInput: AbstractControl = this.loginForm.get(name);

    if (formInput.value.length <= 0) {
      formInput.setErrors({ required: true });
    }  else {
      formInput.setErrors({ required: false });
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get remember() {
    return this.loginForm.get('remember');
  }

}

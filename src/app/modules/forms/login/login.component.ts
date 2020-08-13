import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/online/authentication.service';
import { LoginResponse } from 'src/app/shared/models/responses/impl/loginresponse';
import { AlertService, Alert, Status } from '@app/core/services/offfline/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * Tells us if the form was submitted
   */
  public submitted: boolean = false;

  /**
   * The login form group
   */
  public loginForm: FormGroup;

  /**
   * Keeps track if the password should be visible
   */
  public passwordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    public router: Router,
    private alert: AlertService
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

  /**
   * Check for the form submission
   */
  public onSubmit() {
    this.submitted = true;
    var email : string = this.email.value;
    var password : string = this.password.value;
    var remember: boolean = this.remember.value;
    
    if (this.isFormValid(email, password)) {
      this.submitted = false;
      return;
    }

    this.service.login(email, password, remember).subscribe((response: LoginResponse) => {
      if (!response.success) {
        this.submitted = false;
        this.loginForm.setErrors({invalid: true});
        return;
      }

      this.alert.add(new Alert("You have been successfully logged in!", Status.SUCCESS));
      this.router.navigateByUrl('/dashbaord');
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

  /**
   * Makes the password visible or not
   */
  public makePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Gets the email form group
   */
  get email() {
    return this.loginForm.get('email');
  }

  /**
   * Gets the password form group
   */
  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Gets the remember me form group
   */
  get remember() {
    return this.loginForm.get('remember');
  }

}

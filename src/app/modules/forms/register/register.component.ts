import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, Alert, Status } from 'src/app/core/services/offfline/alert.service';
import { AuthService } from 'src/app/core/services/online/auth-service.service';
import { Validation } from '../validation';
import { RegistrationResponse } from 'src/app/shared/models/responses/impl/registrationresponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * Tells us if the form was submitted
   */
  public submitted: boolean = false;

  /**
   * The register form group
   */
  public registerForm: FormGroup;

  /**
   * Keeps track if the password should be visible
   */
  public passwordVisible: boolean = false;

  constructor(fb: FormBuilder,
    private service: AuthService,
    public router: Router,
    private alert: AlertService) {
      this.registerForm = fb.group({
        "email": new FormControl('', [
          Validators.email,
          Validators.required
        ]),
        "password": new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(32),
          Validation.specialCharacterValidator(),
          Validation.uppercaseValidator(),
          Validation.lowercaseValidator(),
          Validation.numberValidator()
        ]),
        "displayName": new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(16),
          Validation.specialCharacterValidator(false)
        ])
      });
    }

  ngOnInit(): void {
    this.alert.add(new Alert("Account was successfully created. Please login.", Status.SUCCESS));
    this.service.redirectOnLogin();
  }

  //TODO: add more front-end checking
  public onSubmit() : void {
    let email = this.email.value;
    let password = this.password.value;
    let displayName = this.displayName.value;

    this.service.register(email, displayName, password).subscribe((response: RegistrationResponse) => {
      if (response.success) {
        this.alert.add(new Alert("Account was successfully created. Please login.", Status.SUCCESS));
        this.router.navigateByUrl("/login");
        return;
      }

      if (!response.success  && response.error) {
        this.appendErrors(response.error);
      }
    });
  }

  /**
   * This method is used to append errors to the form group
   * @param errorString The string containing all the errors
   */
  private appendErrors(errorString: string) : void {
    var errors: string[] = errorString.split(" - ");
    errors.forEach(element => {
      if (element.startsWith("Email") && element.endsWith("taken.")) {
        this.email.setErrors({taken: true});
      }

      if (element.startsWith("User") && element.endsWith("taken.")) {
        this.displayName.setErrors({taken: true});
      }
    });
  }

  /**
   * Makes the password visible or not
   */
  public makePasswordVisible() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Gets the password form group
   */
  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  /**
   * Gets the email form group
   */
  get email(): AbstractControl {
    return this.registerForm.get('email');
  }

  /**
   * Gets the display name form group
   */
  get displayName(): AbstractControl {
    return this.registerForm.get('displayName');
  }

}

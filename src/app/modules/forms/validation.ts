import { ValidatorFn, AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Console } from 'console';

/**
 * This class houses all validation functions
 */
export class Validation {

    /**
     * Validates the form value has a lower case letter
     */
    public static lowercaseValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valid: boolean = new RegExp(/[a-z]/).test(control.value);
            return valid ? null : {lowervalidate: true};
          }
    }

    /**
     * Validates the form value has an upper case letter
     */
    public static uppercaseValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valid: boolean = new RegExp(/[A-Z]/).test(control.value);
            return valid ? null : {uppervalidate: true};
          }
    }

    /**
     * Validates the form value has one or more special letters
     * @param allowed if the special character is allowed
     */
    public static specialCharacterValidator(allowed: boolean = true): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valid: boolean = new RegExp(/(?=.*[!@#$%^&*()])/).test(control.value);
            
            if (allowed) {
                return valid ? null : {specialvalidate: true};
            } else {
                return valid ? {specialvalidate: true} : null;
            }
          }
    }

    /**
     * Validates the form value has a one or more numbers
     */
    public static numberValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valid: boolean = new RegExp(/[0-9]/).test(control.value);
            return valid ? null : {numbervalidate: true};
          }
    }

    /**
     * Validates if password and confirmPassword is a match
     */
    public static confirmPasswords: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
            const password: string = control.get('password').value;
            const confirmPassword: string = control.get('confirmPassword').value;
            if (password.length <= 0 || confirmPassword.length <= 0) {
                return { passwordsDifferent: true };
            }
            console.log('trying to validate?');
            return password.localeCompare(confirmPassword) == 0 ? null : { passwordsDifferent: true };
    }

}
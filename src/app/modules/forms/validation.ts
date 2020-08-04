import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';

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
     */
    public static specialCharacterValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const valid: boolean = new RegExp(/(?=.*[!@#$%^&*()])/).test(control.value);
            return valid ? null : {specialvalidate: true};
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
     * TODO: Implement
     * Will validate the two values are a loose match
     * @param comparedValue 
     */
    public static sameValueValidator(comparedValue): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} => {
            const value: string = control.value;
            const valid: boolean = true;
            return valid ? null : {numbervalidate: true};
          }
    }

}
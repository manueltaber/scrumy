import { FormControl } from '@angular/forms';

export class DevelopersValidator {

  static isValid(control: FormControl): any {
    if (isNaN(control.value)) {
      return { 'not a number': true }
    }
    if (control.value < 1) {
      return { 'too small': true }
    }
    if (control.value > 100) {
      return { 'too great': true }
    }
    return null;
  }

}

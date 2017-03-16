import { FormControl } from '@angular/forms';

export class VelocityValidator {

  static isValid(control: FormControl): any {
    if (isNaN(control.value)) {
      return { 'not a number': true }
    }
    if (control.value < 0) {
      return { 'too small': true }
    }
    if (control.value > 1) {
      return { 'too great': true }
    }
    return null;
  }

}

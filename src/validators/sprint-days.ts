import { FormControl } from '@angular/forms';

export class SprintDaysValidator {

  static isValid(control: FormControl): any {
    if (isNaN(control.value)) {
      return { 'not a number': true }
    }
    if (control.value < 1) {
      return { 'too small': true }
    }
    if (control.value > 365) {
      return { 'too great': true }
    }
    return null;
  }

}

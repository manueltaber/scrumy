import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { SprintDaysValidator } from '../../validators/sprint-days';
import { VelocityValidator } from '../../validators/velocity';

import { DeveloperVelocity } from '../../models/developer-velocity';

import { DeveloperVelocityService } from '../../services/developer-velocity.service';

@Component({
  selector: 'page-developer-velocity',
  templateUrl: 'developer-velocity.html'
})
export class DeveloperVelocityPage {

  public developerVelocity: DeveloperVelocity = undefined;
  public formGroup: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public navParams: NavParams,
              public navController: NavController,
              public toastController: ToastController,
              public developerVelocityService: DeveloperVelocityService) {
    this.developerVelocity = navParams.get('developerVelocity');

    this.initFormGroup();
  }

  public getTitle(): string {
    if (this.developerVelocity) {
      return 'Edit developer velocity';
    } else {
      return 'Create developer velocity';
    }
  }

  public initFormGroup() {
    let name: string = undefined;
    let velocity: number = undefined;
    let sprintDays: number = undefined;

    if (this.developerVelocity) {
      name = this.developerVelocity.name;
      velocity = this.developerVelocity.velocity;
      sprintDays = this.developerVelocity.sprintDays;
    }

    this.formGroup = this.formBuilder.group({
      name: [name, Validators.compose([Validators.required, Validators.minLength(3)])],
      velocity: [velocity, Validators.compose([Validators.required, VelocityValidator.isValid])],
      sprintDays: [sprintDays, Validators.compose([Validators.required, SprintDaysValidator.isValid])]
    });
  }

  public isFormGroupValid(): boolean {
    return this.formGroup.valid;
  }

  public isNameControlValid(): boolean {
    if (!this.formGroup.controls['name'].dirty) {
      return true;
    }
    return this.formGroup.controls['name'].valid;
  }

  public isVelocityControlValid(): boolean {
    if (!this.formGroup.controls['velocity'].dirty) {
      return true;
    }
    return this.formGroup.controls['velocity'].valid;
  }

  public isSprintDaysControlValid(): boolean {
    if (!this.formGroup.controls['sprintDays'].dirty) {
      return true;
    }
    return this.formGroup.controls['sprintDays'].valid;
  }

  public saveChanges() {
    if (this.developerVelocity) {
      this.developerVelocity.name = this.formGroup.get('name').value;
      this.developerVelocity.velocity = this.formGroup.get('velocity').value;
      this.developerVelocity.sprintDays = this.formGroup.get('sprintDays').value;
      this.developerVelocityService.editDeveloperVelocity(this.developerVelocity);

      let toast = this.toastController.create({
        message: 'Developer updated successfully',
        duration: 5000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Close',
        dismissOnPageChange: false
      });
      toast.present();

    } else {
      let developerVelocity = new DeveloperVelocity();
      developerVelocity.name = this.formGroup.get('name').value;
      developerVelocity.velocity = this.formGroup.get('velocity').value;
      developerVelocity.sprintDays = this.formGroup.get('sprintDays').value;
      this.developerVelocityService.addDeveloperVelocity(developerVelocity);

      let toast = this.toastController.create({
        message: 'Developer created successfully',
        duration: 5000,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'Close',
        dismissOnPageChange: false
      });
      toast.present();
    }

    this.navController.pop();
  }

  public cancelChanges() {
    this.navController.pop();
  }

}

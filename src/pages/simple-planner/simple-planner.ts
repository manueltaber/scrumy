import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DevelopersValidator } from '../../validators/developers';
import { SprintDaysValidator } from '../../validators/sprint-days';
import { VelocityValidator } from '../../validators/velocity';

@Component({
  selector: 'page-simple-planner',
  templateUrl: 'simple-planner.html'
})
export class SimplePlannerPage {

  public formGroup: FormGroup;

  public developers: number = 4;
  public velocity: number = 0.8;
  public sprintDays: number = 10;

  constructor(public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      developers: [this.developers, Validators.compose([Validators.required, DevelopersValidator.isValid])],
      velocity: [this.velocity, Validators.compose([Validators.required, VelocityValidator.isValid])],
      sprintDays: [this.sprintDays, Validators.compose([Validators.required, SprintDaysValidator.isValid])]
    });

    this.formGroup.valueChanges.subscribe(data => {
      this.developers = data['developers'];
      this.velocity = data['velocity'];
      this.sprintDays = data['sprintDays'];

      /*localStorage.setItem("developers", JSON.stringify(this.developers));
      localStorage.setItem("velocity", JSON.stringify(this.velocity));
      localStorage.setItem("sprintDays", JSON.stringify(this.sprintDays));*/
    });
  }

  public isFormGroupValid(): boolean {
    return this.formGroup.valid;
  }

  public isDevelopersControlValid(): boolean {
    return this.formGroup.controls['developers'].valid;
  }

  public isVelocityControlValid(): boolean {
    return this.formGroup.controls['velocity'].valid;
  }

  public isSprintDaysControlValid(): boolean {
    return this.formGroup.controls['sprintDays'].valid;
  }

  public calculateTeamPerformanceInDays(): number {
    return this.developers * this.velocity * this.sprintDays;
  }

  public getFormattedTeamPerformance(): string {
    let days = this.calculateTeamPerformanceInDays();
    let weeks = Math.floor(days / 5);
    let remainigDays = Math.floor(days % 5);

    return String(weeks) + 'w ' + remainigDays + 'd';
  }

  public getFormattedTeamPerformanceInDays(): number {
    let days = this.calculateTeamPerformanceInDays();
    return Math.round(days * 10) / 10;
  }
}

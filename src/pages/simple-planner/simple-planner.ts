import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'page-simple-planner',
  templateUrl: 'simple-planner.html'
})
export class SimplePlannerPage {

  public formGroup: FormGroup;
  public developers: number = 4;
  public velocity: number = 0.8;
  public days: number = 10;

  constructor(public formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      developers: [this.developers, Validators.required],
      velocity: [this.velocity, Validators.required],
      days: [this.days, Validators.required]
    });

    this.formGroup.valueChanges.subscribe(data => {
      console.log('Form changes', data);
      this.developers = data['developers'];
      this.velocity = data['velocity'];
      this.days = data['days'];
    });
  }

  public calculateTeamPerformance(): number {
    return this.developers * this.velocity * this.days;
  }

  public getFormattedTeamPerformance(): string {
    return String(this.calculateTeamPerformance()) + ' days';
  }
}

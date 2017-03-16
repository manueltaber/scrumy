import {Injectable} from '@angular/core';

import { DeveloperVelocity } from '../models/developer-velocity';

import { CacheService } from '../services/cache.service';

@Injectable()
export class DeveloperVelocityService {

  public developerVelocities: DeveloperVelocity[] = [];

  constructor(public cacheService: CacheService) {
    this.developerVelocities = this.cacheService.loadItemsFromCache("DEVELOPER_VELOCITIES", DeveloperVelocity);
  }

  private saveDeveloperVelocitiesToCache() {
    this.cacheService.saveItemsToCache("DEVELOPER_VELOCITIES", this.developerVelocities);
  }
  
  public addDeveloperVelocity(developerVelocity: DeveloperVelocity) {
    this.developerVelocities.push(developerVelocity);
    this.saveDeveloperVelocitiesToCache();
  }

  public editDeveloperVelocity(developerVelocity: DeveloperVelocity) {
    // nothing to do ;)
    this.saveDeveloperVelocitiesToCache();
  }

  public deleteDeveloperVelocity(developerVelocity: DeveloperVelocity) {
    let index = this.developerVelocities.indexOf(developerVelocity, 0);
    if (index > -1) {
      this.developerVelocities.splice(index, 1);
    }
    this.saveDeveloperVelocitiesToCache();
  }

  public calcPerformance(developerVelocity: DeveloperVelocity): number {
    return developerVelocity.velocity * developerVelocity.sprintDays;
  }

  public getOverallPerformance(): number {
    let sum: number = 0;
    for (let developerVelocity of this.developerVelocities) {
      sum = sum + this.calcPerformance(developerVelocity);
    }
    return sum;
  }

  public getFormattedOverallPerformance(): string {
    let days = this.getOverallPerformance();
    let weeks = Math.floor(days / 5);
    let remainigDays = Math.floor(days % 5);

    return String(weeks) + 'w ' + remainigDays + 'd';
  }

  public getFormattedOverallPerformanceInDays(): number {
    let days = this.getOverallPerformance();
    return Math.round(days * 10) / 10;
  }

}

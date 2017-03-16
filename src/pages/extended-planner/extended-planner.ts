import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from 'ionic-angular';

import { DeveloperVelocity } from '../../models/developer-velocity';

import { DeveloperVelocityPage } from '../developer-velocity/developer-velocity';

import { DeveloperVelocityService } from '../../services/developer-velocity.service';

@Component({
  selector: 'page-extended-planner',
  templateUrl: 'extended-planner.html'
})
export class ExtendedPlannerPage {

  constructor(public modalController: ModalController,
              public alertController: AlertController,
              public toastController: ToastController,
              public developerVelocityService: DeveloperVelocityService) {
    
  }

  public developerVelocitiesAvailable(): boolean {
    return this.getDeveloperVelocities().length > 0;
  }

  public getDeveloperVelocities(): DeveloperVelocity[] {
    return this.developerVelocityService.developerVelocities;
  }

  public getFormattedOverallPerformance(): string {
    return this.developerVelocityService.getFormattedOverallPerformance();
  }

  public getFormattedOverallPerformanceInDays(): number {
    return this.developerVelocityService.getFormattedOverallPerformanceInDays();
  }

  public addDeveloperVelocity() {
    let productModal = this.modalController.create(DeveloperVelocityPage);
    productModal.present();
  }

  public editDeveloperVelocity(developerVelocity: DeveloperVelocity) {
    let productModal = this.modalController.create(DeveloperVelocityPage, {developerVelocity: developerVelocity});
    productModal.present();
  }

  public deleteDeveloperVelocity(developerVelocity: DeveloperVelocity) {
    event.stopPropagation();
    let confirm = this.alertController.create({
        title: 'Delete developer?',
        message: 'This developer will disappear from the extended planner view.',
        buttons: [
          { text: 'Cancel' },
          { text: 'Delete',
            handler: () => {
              this.developerVelocityService.deleteDeveloperVelocity(developerVelocity);
              let toast = this.toastController.create({
                message: 'Developer deleted successfully',
                duration: 5000,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'Close',
                dismissOnPageChange: false
              });
              toast.present();
            }
          }
        ]
      });
      confirm.present();
  }
}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { ComingSoonPage } from '../pages/coming-soon/coming-soon';
import { DeveloperVelocityPage } from '../pages/developer-velocity/developer-velocity';
import { ExtendedPlannerPage } from '../pages/extended-planner/extended-planner';
import { SimplePlannerPage } from '../pages/simple-planner/simple-planner';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import { CacheService } from '../services/cache.service';
import { DeveloperVelocityService } from '../services/developer-velocity.service';

@NgModule({
  declarations: [
    MyApp,
    ComingSoonPage,
    DeveloperVelocityPage,
    ExtendedPlannerPage,
    SimplePlannerPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ComingSoonPage,
    DeveloperVelocityPage,
    ExtendedPlannerPage,
    SimplePlannerPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CacheService,
    DeveloperVelocityService
  ]
})
export class AppModule {}

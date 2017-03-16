import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';

import { ComingSoonPage } from '../pages/coming-soon/coming-soon';
import { ExtendedPlannerPage } from '../pages/extended-planner/extended-planner';
import { SimplePlannerPage } from '../pages/simple-planner/simple-planner';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make SimplePlannerPage the root (or first) page
  rootPage: any = SimplePlannerPage;
  plannerPages: Array<{title: string, component: any, icon: string}>;
  generalPages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    // set our app's pages
    this.plannerPages = [
      { title: 'Simple', component: SimplePlannerPage, icon: 'apps' },
      { title: 'Extended', component: ExtendedPlannerPage, icon: 'desktop' },
      { title: 'Roadmap', component: ComingSoonPage, icon: 'pie' }
    ];

    this.generalPages = [
      { title: 'Settings', component: ComingSoonPage, icon: 'settings' },
      { title: 'Help & Feedback', component: ComingSoonPage, icon: 'help-circle' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}

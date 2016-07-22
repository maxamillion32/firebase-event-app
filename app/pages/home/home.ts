import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profile/profile';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public nav: NavController) {
    this.nav = nav;
  }

  goToProfile() {
    this.nav.push(ProfilePage);
  }
}

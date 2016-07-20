import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthData]
})
export class HomePage {

  user;

  constructor(public nav: NavController, public authData: AuthData) {

  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });
  }
}

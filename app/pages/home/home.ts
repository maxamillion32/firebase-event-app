import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [AuthData]
})
export class HomePage {

  email;
  uid;

  constructor(public nav: NavController, public authData: AuthData) {

  }

  ngAfterViewInit() {
    this.authData.fireAuth.onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.email = user.email;
        this.uid = user.uid;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.email = "Test";
      }
    });
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });
  }
}

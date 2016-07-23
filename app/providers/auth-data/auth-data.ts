import {Injectable} from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
import {TabsPage} from '../../pages/tabs/tabs';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;
  local: Storage;

  constructor(public nav: NavController) {

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');

  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }
}

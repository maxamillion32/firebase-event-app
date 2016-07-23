import {Injectable} from '@angular/core';
import {NavController, Alert, Storage, LocalStorage} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
import {TabsPage} from '../../pages/tabs/tabs';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public users: any;
  local: Storage;
  public user: any;

  constructor(public nav: NavController) {

    this.fireAuth = firebase.auth();
    this.users = firebase.database().ref('/users');

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

  updateUser(user) {
    firebase.database().ref('users/' + user.uid).update({
      displayName: user.displayName,
      photoUrl: user.photoURL,
      refreshToken: user.refreshToken,
      lastLogin: new Date().toUTCString()
    });
  }

  logoutUser(): any {
    return this.fireAuth.signOut();
  }
}

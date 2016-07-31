import {Injectable} from '@angular/core';
import {Storage, LocalStorage} from 'ionic-angular';
import * as firebase from 'firebase';

@Injectable()
export class AuthData {
  public fireAuth: any;
  public userProfile: any;
  local: Storage;
  public user: any;

  constructor() {

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/userProfile');

  }

  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  loginUserSocial(providerName) {
    var authProvider;
    switch(providerName) {
      case "twitter" :
        authProvider = new firebase.auth.TwitterAuthProvider();
        break;
      case "facebook" :
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;
      case "google" :
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;
      case "github" :
        authProvider = new firebase.auth.GithubAuthProvider();
        authProvider.addScope("user");
        break;
    }
    return this.fireAuth.signInWithPopup(authProvider);
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

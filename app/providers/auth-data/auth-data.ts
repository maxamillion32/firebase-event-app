import {Injectable} from '@angular/core';
import {NavController, Alert, Storage, LocalStorage} from 'ionic-angular';
import {HomePage} from '../../pages/home/home';
import {LoginPage} from '../../pages/login/login';
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
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((authData) => {
      this.updateUser(this.fireAuth.currentUser);
      this.nav.setRoot(HomePage);
    }, (error) => {
        let prompt = Alert.create({
          message: error.message,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
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
    }
    console.log("shit");
    return this.fireAuth.signInWithPopup(authProvider).then((authData) => {
      this.updateUser(this.fireAuth.currentUser);
      this.nav.setRoot(HomePage);
    }, (error) => {
        let prompt = Alert.create({
          message: error.message,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
  }

  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(email, password).then((authenticatedUser) => {
        this.users.child(authenticatedUser.uid).set({
          email: email
        }).then(() => {
          this.nav.setRoot(HomePage);
        });

      })
    }, (error) => {
      var errorMessage: string = error.message;
        let prompt = Alert.create({
          message: errorMessage,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
  }

  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email).then((user) => {
      let prompt = Alert.create({
        message: "We just sent you a reset link to your email",
        buttons: [{text: "Ok"}]
      });
      this.nav.present(prompt);

    }, (error) => {
      var errorMessage: string;
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "You'll need to write a valid email address";
          break;
        case "auth/user-not-found":
          errorMessage = "That user does not exist";
          break;
        default:
          errorMessage = error.message;
      }

      let prompt = Alert.create({
        message: errorMessage,
        buttons: [{text: "Ok"}]
      });

      this.nav.present(prompt);
    });
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

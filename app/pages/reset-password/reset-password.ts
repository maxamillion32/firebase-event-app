import {NavController, Loading, Alert} from 'ionic-angular';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/reset-password/reset-password.html',
  providers: [AuthData]
})
export class ResetPasswordPage {
  public resetPasswordForm: any;


  constructor(public authData: AuthData, public formBuilder: FormBuilder, public nav: NavController) {
    this.authData = authData;

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.required],
    })
  }

  resetPassword(event){
    event.preventDefault();
    this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
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
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }

}

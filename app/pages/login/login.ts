import {Component} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import {ProfileData} from '../../providers/profile-data/profile-data';
import {SignupPage} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import {ResetPasswordPage} from '../reset-password/reset-password';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData, ProfileData]
})
export class LoginPage {
  public loginForm: any;
  public user: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder, public profileData: ProfileData) {
    this.nav = nav;
    this.authData = authData;

    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser(event){
    event.preventDefault();
    this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((authData) => {
      this.nav.popToRoot();
    }, (error) => {
        let prompt = Alert.create({
          message: error.message,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }

  loginUserSocial(event, provider) {
    event.preventDefault();
    this.authData.loginUserSocial(provider).then((authData) => {
      this.profileData.getUserProfileByLink(authData.user.uid).once('value').then((userData) => {
        this.user = userData.val();
        if(this.user) {
          this.authData.userProfile.child(authData.user.uid).update({
            email: authData.user.email
          });
        }else{
          this.authData.userProfile.child(authData.user.uid).set({
            email: authData.user.email,
            name: authData.user.displayName,
            photoUrl: authData.user.photoURL
          });
        }
      });
      this.nav.popToRoot();
    }, (error) => {
        let prompt = Alert.create({
          message: error.message,
          buttons: [{text: "Ok"}]
        });
        this.nav.present(prompt);
    });
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }

  goToSignup(){
    this.nav.push(SignupPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }

}

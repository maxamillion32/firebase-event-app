import {Component} from '@angular/core';
import {NavController, Loading, Alert} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
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
  providers: [AuthData]
})
export class LoginPage {
  public loginForm: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder) {
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
      this.nav.setRoot(TabsPage);
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

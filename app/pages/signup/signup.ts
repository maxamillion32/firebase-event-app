import {NavController, Loading, Alert} from 'ionic-angular';
import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/common';
import {AuthData} from '../../providers/auth-data/auth-data';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthData]
})
export class SignupPage {
  public signupForm: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder) {
    this.nav = nav;
    this.authData = authData;

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  signupUser(event){
    event.preventDefault();
    this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then((newUser) => {
      this.authData.fireAuth.signInWithEmailAndPassword(this.signupForm.value.email, this.signupForm.value.password).then((authenticatedUser) => {
        this.authData.userProfile.child(authenticatedUser.uid).set({
          email: this.signupForm.value.email
        }).then(() => {
          this.nav.setRoot(TabsPage);
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
    let loading = Loading.create({
      dismissOnPageChange: true,
    });
    this.nav.present(loading);
  }
}

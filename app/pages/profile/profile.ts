import { NavController, Alert } from 'ionic-angular';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData]
})
export class ProfilePage {
  public userProfile: any;
  public birthDate: string;

  constructor(public nav: NavController, public profileData: ProfileData) {
    this.nav = nav;
    this.profileData = profileData;

    this.profileData.getUserProfile().on('value', (data) => {
      this.userProfile = data.val();
      this.birthDate = this.userProfile.birthDate;
    });

  }

  logOut(){
    /*this.authData.logoutUser().then(() => {
      this.nav.rootNav.setRoot(LoginPage);
    });*/
  }

  updateName(){
    let prompt = Alert.create({
      message: "Your first name & last name",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

  updateDOB(birthDate){
    this.profileData.updateDOB(birthDate);
  }

  updateEmail(){
  let prompt = Alert.create({
    inputs: [
      {
        name: 'newEmail',
        placeholder: 'Your new email',
      },
    ],
    buttons: [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: data => {
          this.profileData.updateEmail(data.newEmail);
        }
      }
    ]
  });
  this.nav.present(prompt);
}

  updatePassword(){
    let prompt = Alert.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Save',
          handler: data => {
            this.profileData.updatePassword(data.newPassword);
          }
        }
      ]
    });
    this.nav.present(prompt);
  }

}

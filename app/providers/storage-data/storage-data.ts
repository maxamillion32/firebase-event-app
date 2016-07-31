import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class StorageData {
  public firebaseStorage: any;
  public firebaseStorageRef: any;

  constructor() {
    this.firebaseStorage = firebase.storage();
    this.firebaseStorageRef = this.firebaseStorage.ref();
  }


}

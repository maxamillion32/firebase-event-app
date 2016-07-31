import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the EventDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/event-detail/event-detail.html',
})
export class EventDetailPage {
  currentEvent: any;
   constructor(private nav: NavController, private navParams: NavParams) {
     this.navParams = navParams;
     this.currentEvent = this.navParams.get('eventDetail');
   }
}

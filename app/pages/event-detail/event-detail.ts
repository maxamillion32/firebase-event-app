import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventData } from '../../providers/event-data/event-data';

/*
  Generated class for the EventDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/event-detail/event-detail.html',
  providers: [EventData]
})
export class EventDetailPage {
  currentEvent: any;
   constructor(private nav: NavController, private navParams: NavParams, private eventData: EventData) {
     this.navParams = navParams;
     this.eventData.getEventDetail(this.navParams.get('eventId')).on('value', (snapshot) => {
       this.currentEvent = snapshot.val();
     });
   }

   addGuest(guestName) {
    this.eventData.addGuest(guestName, this.currentEvent.id, this.currentEvent.price).then(() => {
      guestName = '';
    });
  }
}

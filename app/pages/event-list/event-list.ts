import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data/event-data';
import { EventCreatePage} from '../event-create/event-create';

@Component({
  templateUrl: 'build/pages/event-list/event-list.html',
  providers: [EventData]
})
export class EventListPage {
  private eventList: any;

  constructor(private nav: NavController, private eventData: EventData) {
    this.nav = nav;
    this.eventData = eventData;
    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
      });
      this.eventList = rawList;
    });
  }

  goToEventDetail(eventId){
    this.nav.push(EventDetailPage, {
      eventId: eventId,
    });
  }

  goToCreate(){
    this.nav.push(EventCreatePage);
  }
}

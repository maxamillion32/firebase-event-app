import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventData } from '../../providers/event-data/event-data';

@Component({
  templateUrl: 'build/pages/event-create/event-create.html',
  providers: [EventData]
})
export class EventCreatePage {

  constructor(private nav: NavController, private eventData: EventData) {
    this.nav = nav;
    this.eventData = eventData;
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number) {
    this.eventData.createEvent(eventName, eventDate, eventPrice, eventCost).then( () => {
      this.nav.pop();
    });
  }
}

import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class EventData {
  public currentUser: any;
  public eventList: any;

  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.eventList = firebase.database().ref('userProfile/' + this.currentUser.uid + '/eventList');
  }

  createEvent(eventName: string, eventDate: string, eventPrice: number, eventCost: number): any {
    return this.eventList.push({
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1
    }).then( newEvent => {
      this.eventList.child(newEvent.key).child('id').set(newEvent.key);
    });
  }

  getEventList(): any {
    return this.eventList;
  }

  getEventDetail(eventId): any {
    return this.eventList.child(eventId);
  }

  addGuest(guestName, eventId, eventPrice): any {
    return this.eventList.child(eventId).child('guestList').push({
      guestName: guestName
    }).then(() => {
      this.eventList.child(eventId).transaction( (event) => {
        event.revenue += eventPrice;
        return event;
      });
    });
  }
}

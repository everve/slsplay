import { Component } from '@angular/core';
import { Meet, MeetState } from './meet';

@Component({
  selector: 'sd-meet',
  templateUrl: 'app/+meet/meet.component.html',
  styleUrls: ['app/+meet/meet.component.css']
})
/**
 * This class represents the lazy loaded meetComponent.
 */
export class MeetComponent {
  public meetups: Meet[] = new Array<Meet>();

  constructor() {
    //Call out to service to get a list of meetups
    //Or indeed for now manually form some
    //REMOVE BLOCK LATER
    var meet1 = new Meet('My Meet 1', 'A nice first meetup with friends', MeetState.NEW);
    var meet2 = new Meet('My Meet 2', 'A nice first meetup with collegues', MeetState.OPEN);
    var meet3 = new Meet('My meet 3', 'A nice first meetup with collegues', MeetState.CLOSED);
    //END    
    this.meetups.push(meet1);
    this.meetups.push(meet2);
    this.meetups.push(meet3);
  }
}

import {Component} from '@angular/core';
import {Meet} from './meet';

@Component({
  moduleId: module.id,
  selector: 'sd-meet',
  templateUrl: 'meet.component.html',
  styleUrls: ['meet.component.css']
})
export class MeetComponent {
  public meetups:Meet[] = new Array<Meet>();

  constructor() {
    //Call out to service to get a list of meetups
    //Or indeed for now manually form some
    //REMOVE BLOCK LATER
    var meet1 = new Meet();
    var meet2 = new Meet();
    var meet3 = new Meet();
    //END
    this.meetups.push(meet1);
    this.meetups.push(meet2);
    this.meetups.push(meet3);
  }
}

import {Component} from '@angular/core';
import {Meet} from './shared/meet';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
import {MeetService} from './shared/index';

@Component({
  moduleId: module.id,
  selector: 'meet-list',
  templateUrl: 'meet-list.component.html',
  styleUrls: ['meet-list.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

export class MeetListComponent {
  private meets:Meet[];

  constructor(private router:Router,
              private service:MeetService) {
    service.allMine().do(
      (meets)=> {
        this.meets = meets;
      }
    );
  }
}

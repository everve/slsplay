import {Component, OnInit, OnDestroy} from '@angular/core';
import {Meet} from './shared/meet';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Rx';
import {MeetService} from './shared/meet-service';

@Component({
  moduleId: module.id,
  selector: 'meet-detail',
  templateUrl: 'meet-detail.component.html',
  styleUrls: ['meet-detail.component.css']
})
export class MeetDetailComponent implements OnInit, OnDestroy {
  private sub:Subscription;
  private meet:Meet;

  constructor(private route:ActivatedRoute,
              private service:MeetService) {
  }

  ngOnInit() {
    //subscribe so that every time the ID changes we get the relevant meet details.
    this.sub = this.route.params.subscribe(params => {
      this.service.get(params['id']).do((meet)=> {
        this.meet = meet;
      }); //todo pipe transform?
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}

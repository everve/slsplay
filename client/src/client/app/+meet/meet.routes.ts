import { RouterConfig } from '@angular/router';
import { MeetDetailComponent, MeetListComponent } from './index';

export const MeetRoutes: RouterConfig = [
  {
    path: 'meet',
    component: MeetListComponent
  },
  {
    path: 'meet/:id',
    component: MeetDetailComponent
  }
];

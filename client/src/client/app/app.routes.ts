import { provideRouter, RouterConfig } from '@angular/router';
/* NB: folders prefixed with + like +about indicate lazily loaded components */
import { AboutRoutes } from './+about/index';
import { AuthRoutes } from './auth/index';
import { HomeRoutes } from './+home/index';
import { MeetRoutes } from './+meet/index';
const routes: RouterConfig = [
  ...AboutRoutes,
  ...AuthRoutes,
  ...HomeRoutes,
  ...MeetRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];

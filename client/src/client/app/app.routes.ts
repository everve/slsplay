import { provideRouter, RouterConfig } from '@angular/router';
import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import { MeetRoutes } from './+meet/index';
import { LoginRoutes } from './+login/index';
import { SignupRoutes } from './+signup/index';

const routes: RouterConfig = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...MeetRoutes,
  ...LoginRoutes,
  ...SignupRoutes,
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),
];

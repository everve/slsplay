import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Routes } from '@angular/router';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';
import { MeetComponent } from './+meet/index';
import { LoginComponent } from './+login/index';
import { SignupComponent } from './+signup/index';
import { NavbarComponent } from './shared/index';
import { NameListService } from './shared/index';
import { HTTP_PROVIDERS } from '@angular/http';

const GOOGLE_CLIENT_ID = '45135552316-0vfjmn4pef0iel4pldh0ghh9umvh7ba5.apps.googleusercontent.com';
const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  providers:[
    HTTP_PROVIDERS,
    NG2_UI_AUTH_PROVIDERS(
      {
        defaultHeaders: DEFAULT_POST_HEADER,
        providers: {
        facebook: {
          clientId: '1753833431541481'
        },
        google: {
          clientId: GOOGLE_CLIENT_ID
        }
    }
    })]})

@Routes([
  {
    path: '/',
    component: HomeComponent
  },
  {
    path: '/about',
    component: AboutComponent
  },
  {
    path: '/meet',
    component: MeetComponent
  },
  { path: '/login',
    component: LoginComponent
  },
  { path: '/signup',
    component: SignupComponent
  }
])
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */

export class AppComponent {

}

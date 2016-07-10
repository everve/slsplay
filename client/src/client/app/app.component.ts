import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import { AboutComponent } from './+about/index';
import { HomeComponent } from './+home/index';
import { MeetComponent } from './+meet/index';
import { LoginComponent } from './+login/index';
import { SignupComponent } from './+signup/index';
import { NavbarComponent } from './shared/index';
import { NameListService } from './shared/index';


@Component({
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  providers:[
   ]})

export const CLIENT_ROUTER_PROVIDERS = [
 provideRouter([
  //  {path: '', redirectTo: '/login', pathMatch: 'full'},
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
])];
/**
 * This class represents the main application component.
 * Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy
 * loaded components (HomeComponent, AboutComponent).
 */

export class AppComponent {

}

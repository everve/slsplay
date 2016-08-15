import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Config, AuthService, NavbarComponent } from './shared/index';

/**
 * This class represents the main application component.
 * Lazily loaded components are provided by the routes injected in main.ts.
 */
@Component({
  moduleId: module.id,
  selector: 'meet-app',
  providers: [AuthService],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
export class AppComponent {
  constructor() {
    if ('<%= ENV %>' !== 'prod') {
      console.log('Environment config', Config);
    }
  }
}

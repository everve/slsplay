import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { Config, NameListService, NavbarComponent } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService],
  templateUrl: 'app.component.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent]
})
export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}

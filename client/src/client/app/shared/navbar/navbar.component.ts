import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';
import {AuthService} from '../auth/auth-service';

@Component({
  moduleId: module.id,
  selector: 'meet-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, CollapseDirective]
})

/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {
  public isCollapsed:boolean = true;

  constructor(authService:AuthService) {
    authService.updateAuthState();
  }
}

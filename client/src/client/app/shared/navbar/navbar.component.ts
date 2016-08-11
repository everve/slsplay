import {Auth} from 'ng2-ui-auth';
import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, NavigationStart} from '@angular/router';
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, CollapseDirective]
})

/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {
  public isCollapsed: boolean = true;
  public isLoggedInUser: boolean;

  logout() {
    this.auth.logout();
    this.router.navigate(['']); //go to home for now on logout
  }

  updateAuthState(){
    this.isLoggedInUser = this.auth.isAuthenticated();
  }

  constructor(private auth:Auth, private router:Router) {
    this.updateAuthState();
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(this.updateAuthState.bind(this));
  }
}

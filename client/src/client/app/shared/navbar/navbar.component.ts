import {Auth} from 'ng2-ui-auth';
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { CollapseDirective } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'sd-navbar',
  templateUrl: 'app/shared/navbar/navbar.component.html',
  styleUrls: ['app/shared/navbar/navbar.component.css'],
  directives: [ROUTER_DIRECTIVES, CollapseDirective]
})
/**
 * This class represents the navigation bar component.
 */
export class NavbarComponent {
  public isCollapsed:boolean = true;
  logout() {
    this.auth.logout();
    this.router.navigate(['.']); //how to reset?
    console.log('logged out');
  }
  constructor(private auth:Auth, private router:Router){}
}

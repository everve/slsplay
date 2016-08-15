import {Auth, JwtHttp} from 'ng2-ui-auth';
import {Injectable, Inject, forwardRef} from '@angular/core';
import {Router, NavigationStart} from '@angular/router';
import {Configuration} from '../../app.constants';
import {Response, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';

/*Mostly a wrapper around ng2-ui-auth to add some missing bits
 * and only expose what we need. */

@Injectable()
export class AuthService {
  public isUserLoggedIn:boolean;
  private actionUrl:string;

  constructor(
              @Inject(forwardRef(() => Configuration)) configuration: Configuration,
              private auth:Auth,
              private http:JwtHttp,
              private router:Router) {

    this.updateAuthState();
    this.actionUrl = configuration.API + '/auth/';
    this.router.events
      .filter(event => event instanceof NavigationStart)
      .subscribe(this.updateAuthState.bind(this));
  }

  login(user:any, opts?:RequestOptionsArgs):Observable<Response> {
    return this.auth.login(user, opts);
  }

  signup(user:any, opts?:RequestOptionsArgs):Observable<Response> {
    return this.auth.signup(user, opts);
  }

  logout():Observable<void> {
    var logoutObservable = this.auth.logout();
    this.router.navigate(['']); //go to home for now on logout
    return logoutObservable;
  }

  authenticate(name:string, userData?:any):Observable<Response> {
    return this.auth.authenticate(name, userData);
  }

  link(name:string, userData?:any):Observable<Response> {
    return this.auth.link(name, userData);
  }

  unlink(provider:string, opts:RequestOptionsArgs):Observable<Response> {
    return this.auth.unlink(provider, opts);
  }

  isAuthenticated():boolean {
    return this.auth.isAuthenticated();
  }

  forgot(email:string) {
    return this.http.post(this.actionUrl + 'forgot', JSON.stringify({email: email}));
  }

  public updateAuthState() {
    this.isUserLoggedIn = this.auth.isAuthenticated();
  }
}

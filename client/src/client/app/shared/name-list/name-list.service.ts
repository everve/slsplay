import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {JwtHttp} from 'ng2-ui-auth';
import {Configuration} from '../../app.constants';


/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {
  private actionUrl : string;

  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param {Configuration} configuration - The injected service paths.
   * @constructor
   */
  constructor(private http: JwtHttp, private configuration: Configuration) {
    this.http = http;
    this.actionUrl = configuration.API + '/assets/data.json'
  }

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    //todo
    return this.http.get(this.actionUrl)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

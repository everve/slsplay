import {Injectable} from '@angular/core';
import {Configuration} from '../../app.constants';
import {Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {JwtHttp} from 'ng2-ui-auth';
import {Meet} from './meet';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MeetService {
  private actionUrl:string;
  private headers:Headers;
  private compose:any;

  constructor(private _http:JwtHttp, private _configuration:Configuration) {
    //get the default details of the public api and post to that
    this.actionUrl = _configuration.API + '/meetups';
    this.compose = (...fns:any[]) => fns.reduce((f, g) => (...args:any[]) => f(g(...args)));
  }

  //server should not allow meetupId for create etc.
  set(meet:Meet) {

    var meetJson = {
      apiVersion: 1,
      correlationId: 'TODO',
      data: {
        userId: meet.userId,
        meetupId: meet.id,
        videoId: meet.videoId,
        photoId: meet.photoId,
        title: meet.title,
        description: meet.description,
        state: meet.state,
        invitees: meet.invitees
      }
    };

    let body:string = JSON.stringify(meetJson);
    var fun = meet.id ? this._http.put : this._http.post;
    return fun(this.actionUrl, body, {headers: this.headers}).map(res => res.json())
      .map(this.compose(Meet.from, this.extractData))
      .catch(this.handleError);
  }

  allMine() {
    var url = this.actionUrl;
    return this._http.get(url)
      .map(this.compose(Meet.from, this.extractData))
      .catch(this.handleError);
  }

  allPublic() {
    var url = this.actionUrl;
    return this._http.get(url + '?public=true')
      .map(this.compose(Meet.from, this.extractData))
      .catch(this.handleError);
  }

  get(meetId:string) {
    var url = this.actionUrl + (meetId ? '/' + meetId : '');
    return this._http.get(url)
      .map(this.compose(Meet.from, this.extractData))
      .catch(this.handleError);
  }

  private extractData(response:Response) {
    let body = response.json();
    return body.data || {};
  }

  private handleError(error:any) {
    //todo generic centrally logged and locally reported errors.
    let errMsg = (error.message) ?
      error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

import {Injectable} from '@angular/core';
import {Configuration} from '../../app.constants';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MeetsService {
  private actionUrl:string;
  private headers:Headers;

  constructor(private _http:Http, private _configuration:Configuration) {
    //get the default details of the public api and post to that
    this.actionUrl = _configuration.ServerWithApiUrl + '/meetups';

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  getAll(user:string) {
    let body:string = '{"apiVersion": 1, "correlationId":"corr-1","data":{ "email": "' + emailAddress + '"}';
    var success:boolean = false;
    var data:any = null;
    var error:any = null;
    this._http.post(this.actionUrl + 'interested', body, {headers: this.headers}).map(res => res.json())
      .subscribe(
        (dat) => data = dat,
        (err) => error = err);

    if (error !== null) {
      success = false;
    } else if (data !== null) {
      if (data.httpcode === 201) {
        success = true;
      }
    }
    return success;
  }

  getOne(meetupId:string){

  }

}

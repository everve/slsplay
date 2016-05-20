import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public BackendServer: string = 'http://3bjbvzcrt5.execute-api.eu-central-1.amazonaws.com/';
    public ApiUrl: string = 'dev4/api/meetups';
    public ServerWithApiUrl = this.BackendServer + this.ApiUrl;
}

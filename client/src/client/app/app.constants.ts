import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public BackendServer: string = 'https://meets.everve.co.uk/';
    public ApiUrl: string = 'api';
    public ServerWithApiUrl = this.BackendServer + this.ApiUrl;
}

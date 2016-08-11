import { Injectable } from '@angular/core';
import { Config } from './shared/index';
//makes the environment specific deployed env vars injectable and constant.
@Injectable()
export class Configuration {
    public API: string = Config.API;
    public GOOGLE_CLIENT_ID: string = Config.GOOGLE_CLIENT_ID;
    public FACEBOOK_CLIENT_ID: string = Config.FACEBOOK_CLIENT_ID;
}

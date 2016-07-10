import { APP_BASE_HREF } from '@angular/common';
import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import {AppComponent, CLIENT_ROUTER_PROVIDERS} from './app.component';
import {provideForms, disableDeprecatedForms} from '@angular/forms';
import {HTTP_PROVIDERS} from '@angular/http';
import {NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';

const GOOGLE_CLIENT_ID = '45135552316-0vfjmn4pef0iel4pldh0ghh9umvh7ba5.apps.googleusercontent.com';
const DEFAULT_POST_HEADER: {[name: string]: string} = {
  'Content-Type': 'application/json'
};

if ('<%= ENV %>' === 'prod') { enableProdMode(); }

/**
 * Bootstraps the application and makes the ROUTER_PROVIDERS
 * and the APP_BASE_HREF available to it.
 *
 * @see https://angular.io/docs/ts/latest/api/platform-browser-dynamic/index/bootstrap-function.html
 */
bootstrap(AppComponent, [
  disableDeprecatedForms(),
  provideForms(),
  CLIENT_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  NG2_UI_AUTH_PROVIDERS(
    {
      defaultHeaders: DEFAULT_POST_HEADER,
      providers: {
        facebook: {
          clientId: '1753833431541481'
        },
        google: {
          clientId: GOOGLE_CLIENT_ID
        }
      }
    }),
  {provide:APP_BASE_HREF, useValue: '<%= APP_BASE %>' }
]);

// In order to start the Service Worker located at "./worker.js"
// uncomment this line. More about Service Workers here
// https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
//
// if ('serviceWorker' in navigator) {
//   (<any>navigator).serviceWorker.register('./worker.js').then((registration: any) =>
//       console.log('ServiceWorker registration successful with scope: ', registration.scope))
//     .catch((err: any) =>
//       console.log('ServiceWorker registration failed: ', err));
// }

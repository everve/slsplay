import {APP_BASE_HREF} from '@angular/common';
import {Component, OpaqueToken} from '@angular/core';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {
  async,
  inject
} from '@angular/core/testing';
import {
  XHRBackend,
  HTTP_PROVIDERS
} from '@angular/http';

import {MockBackend} from '@angular/http/testing';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {HomeComponent} from './home.component';
import {NG2_UI_AUTH_PROVIDERS, Auth} from 'ng2-ui-auth';
import {Configuration} from '../app.constants';

export function main() {
  describe('Home component', () => {
    // Disable old forms
    let providerArr:any[];

    beforeEach(
      () => {
        providerArr = [disableDeprecatedForms(), provideForms()];
      }
    );

    it('when use',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((rootTC:any) => {

            rootTC.detectChanges();

           // let homeInstance = rootTC.debugElement.children[0].componentInstance;
            let homeDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(homeDOMEl, 'li').length).toEqual(0);
          });
      })));
  });
}
var BASE_API = new OpaqueToken('slsServiceApi');
@Component({
  providers: [
    Auth,
    HTTP_PROVIDERS,
    MockBackend,
    Configuration,
    {provide: XHRBackend, useExisting: MockBackend},
    {provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>'},
    {provide: BASE_API, useValue: '<%= API %>'},
    NG2_UI_AUTH_PROVIDERS(
      {
        baseUrl: BASE_API.toString(),
        providers: {
          facebook: {
            clientId: ''
          },
          google: {
            clientId: ''
          }
        }
      }),
  ],
  selector: 'test-cmp',
  template: '<sd-home></sd-home>',
  directives: [HomeComponent]
})
class TestComponent {
}

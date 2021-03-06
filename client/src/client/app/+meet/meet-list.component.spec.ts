import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {
  async,
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';

import {MeetListComponent} from './meet-list.component';
import {
  addProviders
} from '@angular/core/testing';
import {Configuration} from '../app.constants';
import {MockBackend} from '@angular/http/testing';
import {Auth, NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {AuthService} from '../shared/auth/auth-service';
import {provideFakeRouter} from '../../testing/router/router-testing-providers';
import {RouterConfig} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';
import {MeetService} from './shared/meet-service';

export function main() {

  describe('Meet List component', () => {

    beforeEach(() => {
      // Support for testing component that uses Router
      let config:RouterConfig = [];

      addProviders([
        provideFakeRouter(TestComponent, config),
        Configuration,
        FormBuilder,
        Auth,
        HTTP_PROVIDERS,
        MockBackend,
        {provide: XHRBackend, useExisting: MockBackend},
        NG2_UI_AUTH_PROVIDERS(
          {
            baseUrl: 'any',
            providers: {
              facebook: {
                clientId: ''
              },
              google: {
                clientId: ''
              }
            }
          }),
        AuthService,
        MeetService
      ]);

    });

    it('should be able to read pre-list blurb',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC:any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(aboutDOMEl, 'p')[0].textContent)
              .toEqual('Please select a meetup from the list below:');
          });
      })));
  });
}

@Component({
  selector: 'test-cmp',
  directives: [MeetListComponent],
  template: '<meet-list></meet-list>'
})
class TestComponent {
}

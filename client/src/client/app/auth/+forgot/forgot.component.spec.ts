import {ForgotComponent} from './forgot.component';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {
  expect,
  inject,
  async, addProviders
} from '@angular/core/testing';
import {Configuration} from '../../app.constants';
import {MockBackend} from '@angular/http/testing';
import {Auth, NG2_UI_AUTH_PROVIDERS} from 'ng2-ui-auth';
import {HTTP_PROVIDERS, XHRBackend} from '@angular/http';
import {AuthService} from '../../shared/auth/auth-service';
import {provideFakeRouter} from '../../../testing/router/router-testing-providers';
import {RouterConfig} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

export function main() {

  beforeEach(() => {
    // Support for testing component that uses Router
    let config:RouterConfig = [
    ];

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
      AuthService
    ]);

  });

  describe('Forgot component', () => {

    it('dom elements correct',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb
          .createAsync(TestComponent)
          .then((rootTC:any) => {
            let forgotDOMEl = rootTC.debugElement.children[0].nativeElement;
            expect(getDOM().querySelectorAll(forgotDOMEl, 'h3')[0].textContent)
              .toEqual('Enter your email address to receive a reminder email.');
          });
      })));

    //TODO proper mock of forgot service call and form submission.

  });


  @Component({
    selector: 'test-cmp',
    directives: [ForgotComponent],
    template: '<meet-forgot></meet-forgot>'
  })
  class TestComponent {
  }
}

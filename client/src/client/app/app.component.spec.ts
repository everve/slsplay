import {Component, OpaqueToken} from '@angular/core';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {Configuration} from './app.constants';
import {
  addProviders,
  async,
  inject
} from '@angular/core/testing';
import {
  RouterConfig
} from '@angular/router';
import {
  XHRBackend,
  HTTP_PROVIDERS
} from '@angular/http';

import {MockBackend} from '@angular/http/testing';
import {NG2_UI_AUTH_PROVIDERS, Auth} from 'ng2-ui-auth';

import {provideFakeRouter} from '../testing/router/router-testing-providers';

import {AppComponent} from './app.component';
import {HomeComponent} from './+home/home.component';
import {AboutComponent} from './+about/about.component';
import {AuthService} from './shared/auth/auth-service';

export function main() {

  describe('App component', () => {

    beforeEach(() => {

      // Support for testing component that uses Router
      let config:RouterConfig = [
        {path: '', component: HomeComponent},
        {path: 'about', component: AboutComponent}
      ];
      var BASE_API = new OpaqueToken('slsServiceApi');

      addProviders([
        provideFakeRouter(TestComponent, config),
        Configuration,
        Auth,
        HTTP_PROVIDERS,
        MockBackend,
        {provide: XHRBackend, useExisting: MockBackend},
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
        AuthService
      ]);
    });

    it('should build without a problem',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb
          .createAsync(TestComponent)
          .then((fixture) => {
            expect(fixture.nativeElement.innerText.indexOf('HOME')).toBeTruthy();
          });
      })));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<meet-app></meet-app>',
  directives: [AppComponent]
})
class TestComponent {
}

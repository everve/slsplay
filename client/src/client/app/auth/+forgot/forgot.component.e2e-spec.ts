import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {
  inject,
  async
} from '@angular/core/testing';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {ForgotComponent} from './forgot.component';

export function main() {
  describe('Forgot component', () => {
    // Disable old forms
    let providerArr:any[];

    it('dom elements correct',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
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
    template: '<app-forgot></app-forgot>'
  })
  class TestComponent {
  }
}

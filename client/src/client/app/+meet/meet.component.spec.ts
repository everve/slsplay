import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import {
  describe,
  expect,
  inject,
  it
} from '@angular/core/testing';
import { getDOM } from '@angular/platform-browser/src/dom/dom_adapter';

import { MeetComponent } from './meet.component';

export function main() {
  describe('Meet component', () => {
    it('should be able to read pre-list blurb',
      inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(TestComponent)
          .then((rootTC: any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

	    expect(getDOM().querySelectorAll(aboutDOMEl, 'p')[0].textContent)
        .toEqual('Welcome to Everve Meets - please select a meetup from the list below:');
          });
        }));
    });
}

@Component({
  selector: 'test-cmp',
  directives: [MeetComponent],
  template: '<sd-meet></sd-meet>'
})
class TestComponent {}

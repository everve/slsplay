import {TestComponentBuilder} from '@angular/compiler/testing';
import {Component} from '@angular/core';
import {
  expect,
  inject,
  async
} from '@angular/core/testing';
import {AboutComponent} from './about.component';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

export function main() {
  describe('About component', () => {

    it('should contain some relevant text.',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb
          .createAsync(TestComponent)
          .then((rootTC:any) => {
            let aboutDOMEl = rootTC.debugElement.children[0].nativeElement;

            expect(getDOM().querySelectorAll(aboutDOMEl, 'h1')[0].textContent)
              .toEqual('everve meets - an open source, serverless, kitchen-sink demo.');
          });
      })));
  });
}
/* TODO confirm ?
 */
@Component({
  selector: 'test-cmp',
  directives: [AboutComponent],
  template: '<meet-about></meet-about>'
})
class TestComponent {
}

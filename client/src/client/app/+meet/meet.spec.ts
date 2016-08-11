import { Meet } from './meet';

import {
  describe,
  expect,
  it
} from '@angular/core/testing';


export function main() {
  describe('Meet data object component', () => {
        var myMeet = new Meet();
        myMeet.state = 'NEW';
        it('Should be instantiated and have members set accordingly', () => {
            //test the meetup
            expect(myMeet.state).toEqual('NEW');
        });
    });
}

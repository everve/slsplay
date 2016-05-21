import { Meet, MeetState } from './meet';

import {
  describe,
  expect,
  it
} from '@angular/core/testing';


export function main() {
  describe('Meet data object component', () => {
        var myMeet = new Meet('Test meetup', 'Welcome to my test meetup its amazing', MeetState.NEW);

        it('Should be instantiated and have members set accordingly', () => {
            //test the meetup
            expect(myMeet.getState()).toEqual('NEW');
        });
    });
}

import { NameListService } from './name-list.service';
//import {JwtHttp} from 'ng2-ui-auth';

export function main() {
  describe('Http Service', () => {
    let nameListService: NameListService;


    beforeEach(() => {
      nameListService = new NameListService(null);
    });

    it('should return the list of names', () => {
      let names = nameListService.get();
      expect(names).toEqual(jasmine.any(Array));
    });
  });
}

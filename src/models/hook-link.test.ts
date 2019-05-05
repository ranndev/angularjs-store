import angular from 'angular';
import HookLink from './hook-link';

let hookLink: HookLink;
let destroyer: () => void;

beforeEach(() => {
  destroyer = jest.fn();
  hookLink = new HookLink(destroyer);
});

describe('HookLink', () => {
  describe('destroy', () => {
    it('should call the destroyer function', () => {
      hookLink.destroy();
      expect(destroyer).toHaveBeenCalled();
    });
  });
});

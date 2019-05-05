import { IScope, IControllerService } from 'angular';
import HookLink from './hook-link';

let hookLink: HookLink;
let destroyer: () => void;
let scope: IScope;

beforeEach(() => {
  destroyer = jest.fn();
  hookLink = new HookLink(destroyer);
});

beforeEach(inject(($rootScope: angular.IRootScopeService) => {
  scope = $rootScope.$new();
}));

describe('HookLink', () => {
  describe('destroy', () => {
    it('should call the destroyer function', () => {
      hookLink.destroy();
      expect(destroyer).toBeCalledTimes(1);
    });
  });

  describe('destroyOn', () => {
    it('should automatically call the destroyer function when bounded scope destroyed', () => {
      hookLink.destroyOn(scope);
      scope.$destroy();
      expect(destroyer).toHaveBeenCalledTimes(1);
    });
  });
});

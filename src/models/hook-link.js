export default class HookLink {
  constructor(destroyer) {
    if (!angular.isFunction(destroyer)) {
      throw new Error('destroyer must be a function');
    }

    this.destroy = destroyer;
    this.bindDestroy = ($scope) => {
      $scope.$on('$destroy', () => {
        this.destroy();
      });
    };
  }
}

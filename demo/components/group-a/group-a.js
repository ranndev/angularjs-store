import template from './group-a.html';

class Controller {
  constructor($scope, StoreLogger, GroupAStore) {
    this.logger = StoreLogger.create('Group A');

    GroupAStore.hook(/^UPDATE/, (states) => {
      this.logger.logHook();
      this.states = states;
    }).destroyOn($scope);
  }
}

export default {
  template,
  controller: ['$scope', 'StoreLogger', 'GroupAStore', Controller],
  controllerAs: 'groupA',
};

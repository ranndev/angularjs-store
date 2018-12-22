import template from './group-a-component-a.html';

class Controller {
  constructor($scope, StoreLogger, GroupAStore) {
    this.logger = StoreLogger.create('Group A - Component A');
    this.store = GroupAStore;

    this.store.hook(/^UPDATE_(B|C)/, ({ stateA, ...otherStates }) => {
      this.logger.logHook();
      this.state = stateA;
      this.otherStates = otherStates;
    }).destroyOn($scope);
  }

  handleKeyup(event) {
    if (event.keyCode === 13) {
      const action = 'UPDATE_A';

      this.logger.logDispatch(action);
      this.store.dispatch(action, {
        stateA: this.state,
      });
    }
  }
}

export default {
  template,
  controller: ['$scope', 'StoreLogger', 'GroupAStore', Controller],
  controllerAs: 'groupAComponentA',
};

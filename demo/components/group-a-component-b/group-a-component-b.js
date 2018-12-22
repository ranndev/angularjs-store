import template from './group-a-component-b.html';

class Controller {
  constructor($scope, StoreLogger, GroupAStore) {
    this.logger = StoreLogger.create('Group A - Component B');
    this.store = GroupAStore;

    this.store.hook(/^UPDATE_(A|C)/, ({ stateB, ...otherStates }) => {
      this.logger.logHook();
      this.state = stateB;
      this.otherStates = otherStates;
    }).destroyOn($scope);
  }

  handleKeyup(event) {
    if (event.keyCode === 13) {
      const action = 'UPDATE_B';

      this.logger.logDispatch(action);
      this.store.dispatch(action, {
        stateB: this.state,
      });
    }
  }
}

export default {
  template,
  controller: ['$scope', 'StoreLogger', 'GroupAStore', Controller],
  controllerAs: 'groupAComponentB',
};

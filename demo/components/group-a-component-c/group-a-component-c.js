import template from './group-a-component-c.html';

class Controller {
  constructor($scope, StoreLogger, GroupAStore) {
    this.logger = StoreLogger.create('Group A - Component C')
    this.store = GroupAStore;

    this.store.hook(/^UPDATE_(A|B)/, ({stateC, ...otherStates}) => {
      this.logger.logHook();
      this.state = stateC;
      this.otherStates = otherStates;
    }).destroyOn($scope);
  }

  handleKeyup(event) {
    if (event.keyCode === 13) {
      const action = 'UPDATE_C';

      this.logger.logDispatch(action);
      this.store.dispatch(action, {
        stateC: this.state
      });
    }
  }
}

export default {
  template: template,
  controller: ['$scope', 'StoreLogger', 'GroupAStore', Controller],
  controllerAs: 'groupAComponentC'
}

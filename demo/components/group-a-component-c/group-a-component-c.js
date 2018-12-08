import template from './group-a-component-c.html';

class Controller {
  constructor(GroupAStore) {
    this.store = GroupAStore;

    this.store.hook(/^UPDATE/, ({stateC, ...otherStates}) => {
      this.state = stateC;
      this.otherStates = otherStates;
    });
  }

  handleChange() {
    this.store.dispatch('UPDATE_C', {
      stateC: this.state
    });
  }
}

export default {
  template: template,
  controller: ['GroupAStore', Controller],
  controllerAs: 'groupAComponentC'
}

import template from './group-a-component-b.html';

class Controller {
  constructor(GroupAStore) {
    this.store = GroupAStore;

    this.store.hook(/^UPDATE/, ({stateB, ...otherStates}) => {
      this.state = stateB;
      this.otherStates = otherStates;
    });
  }

  handleChange() {
    this.store.dispatch('UPDATE_B', {
      stateB: this.state
    });
  }
}

export default {
  template: template,
  controller: ['GroupAStore', Controller],
  controllerAs: 'groupAComponentB'
}

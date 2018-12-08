import template from './group-a-component-a.html';

class Controller {
  constructor(GroupAStore) {
    this.store = GroupAStore;

    this.store.hook(/^UPDATE/, ({stateA, ...otherStates}) => {
      this.state = stateA;
      this.otherStates = otherStates;
    });
  }

  handleChange() {
    this.store.dispatch('UPDATE_A', {
      stateA: this.state
    });
  }
}

export default {
  template: template,
  controller: ['GroupAStore', Controller],
  controllerAs: 'groupAComponentA'
}

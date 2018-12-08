import template from './group-a.html';

class Controller {
  constructor(GroupAStore) {
    GroupAStore.hook(/^UPDATE/, (states, calls) => {
      this.states = states;
    });
  }
}

export default {
  template: template,
  controller: ['GroupAStore', Controller],
  controllerAs: 'groupA'
}

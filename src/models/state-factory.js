import State from './state';

export default class StateFactory {
  constructor() {
    this.storesState = {};
  }

  register(storeId, initialState) {
    this.storesState[storeId] = new State(initialState);
  }

  deregister(storeId) {
    delete this.storesState[storeId];
  }

  getState(storeId) {
    const storeState = this.storesState[storeId];

    if (!angular.isDefined(storeState)) {
      throw new Error('No state registered by store ', storeId);
    }

    return storeState;
  }
}

import State from './state';

export default class StateFactory {
  constructor() {
    this.storesState = {};
  }

  register(storeId, initialState, customCopier) {
    this.storesState[storeId] = new State(initialState, customCopier);
  }

  deregister(storeId) {
    delete this.storesState[storeId];
  }

  getState(storeId) {
    return this.storesState[storeId];
  }
}

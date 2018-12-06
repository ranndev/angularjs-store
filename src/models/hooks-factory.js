import Hooks from './hooks';

export default class HooksFactory {
  constructor() {
    this.storesHooks = {};
  }

  register(storeId) {
    this.storesHooks[storeId] = new Hooks();
  }

  deregister(storeId) {
    delete this.storesHooks[storeId];
  }

  getHooks(storeId) {
    return this.storesHooks[storeId];
  }
}

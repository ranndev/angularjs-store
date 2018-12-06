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
    const storeHooks = this.storesHooks[storeId];

    if (!angular.isDefined(storeHooks)) {
      throw new Error('No hooks container registered by store ', storeId);
    }

    return storeHooks;
  }
}

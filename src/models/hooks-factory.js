import Hooks from './hooks';

class HooksFactory {
  /**
   * @constructor
   * @returns {HooksFactory}
   */
  constructor() {
    this.storesHooks = {};
  }

  /**
   * Register store hooks in factory.
   * @param {number} storeId store ID.
   */
  register(storeId) {
    this.storesHooks[storeId] = new Hooks();
  }

  /**
   * Get a store hooks.
   * @param {number} storeId store ID.
   * @returns {Hooks}
   */
  getHooks(storeId) {
    const storeHooks = this.storesHooks[storeId];

    if (!angular.isDefined(storeHooks)) {
      throw new Error('No hooks container registered with store ID ', storeId);
    }

    return storeHooks;
  }
}

export default HooksFactory;

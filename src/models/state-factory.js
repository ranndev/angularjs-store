import State from './state';

class StateFactory {
  /**
   * @constructor
   * @returns {StateFactory}
   */
  constructor() {
    this.storesState = {};
  }

  /**
   * Register store state in factory.
   * @param {number} storeId store ID.
   * @param {object} initialState initial store.
   */
  register(storeId, initialState) {
    this.storesState[storeId] = new State(initialState);
  }

  /**
   * Get a store state.
   * @param {number} storeId store ID.
   * @returns {State}
   */
  getState(storeId) {
    const storeState = this.storesState[storeId];

    if (angular.isUndefined(storeState)) {
      throw new Error('No state registered with store ID ', storeId);
    }

    return storeState;
  }
}

export default StateFactory;

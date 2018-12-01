const NgStore = (function () {
  const $state = Symbol('state');

  class NgStore {
    /**
     * @constructor
     * @param {object} initialState - Initial state of store.
     * @param {function} copier - Optional. A custom copier for store.
     * @returns {NgStore} - NgStore instance.
     */
    constructor(initialState, copier) {
      if (!angular.isObject(initialState)) {
        throw new Error('Initial State must be an object');
      }

      this[$state] = initialState;

      if (copier && !angular.isFunction(copier)) {
        throw new Error('Copier must be a function');
      }

      this.copier = copier || angular.copy;
    }

    /**
     * Get a copy of state or just a property of state.
     * @param {string} stateProp - Optional. Specific property of state.
     * @returns {any} - State or single property of state.
     */
    copy(stateProp) {
      if (stateProp) {
        return this.copier(this[$state][stateProp]);
      } else {
        return this.copier(this[$state]);
      }
    }

    /**
     * Dispatch an action for updating state.
     * @todo Implement soon.
     */
    dispatch() {}

    /**
     * Listen for dispatched action in store to get the latest state.
     * @todo Implement soon.
     */
    hook() {}
  }

  return NgStore;
})();

export default NgStore;

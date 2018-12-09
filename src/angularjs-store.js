import StateFactory from './models/state-factory';
import HooksFactory from './models/hooks-factory';
import HookLink from './models/hook-link';

const NgStore = (function () {
  let instances = 0;
  const $$stateFactory = new StateFactory();
  const $$hooksFactory = new HooksFactory();

  class NgStore {
    /**
     * @constructor
     * @param {object} initialState intial object state.
     * @returns {NgStore}
     */
    constructor(initialState) {
      if (!angular.isObject(initialState) || angular.isArray(initialState)) {
        throw new Error('Initial state must be an object');
      }

      this.$$id = ++instances;

      $$stateFactory.register(this.$$id, initialState);
      $$hooksFactory.register(this.$$id);
    }

    /**
     * Get a new copy of state.
     * @param {string} stateProp specific property of state. optional.
     * @returns {any}
     */
    copy(stateProp) {
      const state = $$stateFactory.getState(this.$$id);

      return state.get(stateProp);
    }

    /**
     * Attach a hook to the store and get notified everytime the store was updated.
     * The reducers will trigerred only when the action query matched the dispatched action.
     * @param {any} actionQuery used to query the dispatched action.
     * @param {...function} reducers functions that runs after action query was passed.
     * @returns {HookLink}
     */
    hook(actionQuery, ...reducers) {
      let test = null;

      if (angular.isString(actionQuery)) {
        test = (action) => (action === actionQuery);
      } else if (angular.isArray(actionQuery)) {
        test = (action) => (actionQuery.indexOf(action) > -1);
      } else if (actionQuery instanceof RegExp) {
        test = (action) => actionQuery.test(action);
      } else {
        throw new Error('Hook action query must be either a string, array or regexp');
      }

      if (
        reducers.length === 0 ||
        reducers.filter((reducer) => !angular.isFunction(reducer)).length > 0
      ) {
        throw new Error('Hook reducers is required and must be all functions');
      }

      const state = $$stateFactory.getState(this.$$id);
      const hooks = $$hooksFactory.getHooks(this.$$id);

      return hooks.addHook(test, reducers, state);
    }

    /**
     * Update the state by dispatching an action.
     * All hooks will be notified after the state were updated.
     * @param {string} action action type.
     * @param {any} newState state updates.
     */
    dispatch(action, newState) {
      if (!angular.isString(action)) {
        throw new Error('Action must be a string');
      }

      const state = $$stateFactory.getState(this.$$id);

      if (angular.isFunction(newState)) {
        newState = newState(state.get());
      } else if (!angular.isObject(newState) || angular.isArray(newState)) {
        throw new Error('New state must be an object');
      }

      const hooks = $$hooksFactory.getHooks(this.$$id);

      state.set(newState);
      hooks.attemptRunAll(action, state);
    }
  }

  return NgStore;
})();

export default NgStore;

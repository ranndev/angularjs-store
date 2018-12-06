import StateFactory from './models/state-factory';
import HooksFactory from './models/hooks-factory';

const NgStore = (function () {
  let instances = 0;
  const $$stateFactory = new StateFactory();
  const $$hooksFactory = new HooksFactory();

  class NgStore {
    constructor(initialState, options = {}) {
      this.$$id = ++instances;
      
      $$stateFactory.register(this.$$id, initialState, options.copier);
      $$hooksFactory.register(this.$$id);
    }

    copy(stateProp) {
      const state = $$stateFactory.getState(this.$$id);

      return state.get(stateProp);
    }

    dispatch(action, newState) {
      if (!angular.isString(action)) {
        throw new Error('Dispatched action must be a string');
      }

      if (!angular.isObject(newState)) {
        throw new Error('Dispatched state must be an object');
      }

      const state = $$stateFactory.getState(this.$$id);
      const hooks = $$hooksFactory.getHooks(this.$$id);
      const updatedState = state.set(newState);

      hooks.attemptRunAll(action, updatedState);
    }

    hook(actionQuery, ...reducers) {
      const state = $$stateFactory.getState(this.$$id);
      const hooks = $$hooksFactory.getHooks(this.$$id);

      return hooks.addHook(actionQuery, reducers, state.get());
    }

    destroy() {
      $$stateFactory.deregister(this.$$id);
      $$hooksFactory.deregister(this.$$id);
    }
  }

  return NgStore;
})();

export default NgStore;

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

    copy() {}

    dispatch(action, state) {}

    hook(actionQuery, ...reducers) {}

    destroy() {}
  }

  return NgStore;
})();

export default NgStore;

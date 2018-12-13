import Hook from './hook';
import HookLink from './hook-link';

class Hooks {
  /**
   * @constructor
   * @returns {Hooks}
   */
  constructor() {
    this.hooks = [];
  }

  /**
   * Add hook in collection.
   * @param {function} test function that test an string action.
   * @param {array} reducers array of function that will call if action is passed the test.
   * @param {State} state payload of action.
   * @returns {HookLink}
   */
  addHook(test, reducers, state) {
    const hook = new Hook(test, reducers);
    this.hooks.push(hook);

    // Initial forced run
    hook.attemptRun(null, state, true);

    return new HookLink(() => {
      this.hooks.splice(this.hooks.indexOf(hook), 1);
    });
  }

  /**
   * Attempt to run all hooks by the given action.
   * @param {string} action dispatched action.
   * @param {State} state payload of action.
   */
  attemptRunAll(action, state) {
    this.hooks.forEach((hook) => {
      hook.attemptRun(action, state);
    });
  }
}

export default Hooks;

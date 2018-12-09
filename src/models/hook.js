import State from 'src/models/state';

class Hook {
  /**
   * @constructor
   * @param {function} test function that test the action.
   * @param {array} reducers array of function/callbacks that runs if test is passed.
   * @returns {Hook}
   */
  constructor(test, reducers) {
    this.test = test;
    this.reducers = reducers;

    // Property to track the number of calls
    this.calls = 0;
  }

  /**
   * Attept run by action.
   * @param {string} action dispatched action.
   * @param {State} state payload of action.
   * @param {boolean} isForce optional. flag to bypass the test.
   */
  attemptRun(action, state, isForce = false) {
    if (isForce || this.test(action)) {
      state = state.get();

      for (let i = 0; i < this.reducers.length; i++) {
        state = this.reducers[i](state, ++this.calls);
      }
    }
  }
}

export default Hook;

export default class Hook {
  constructor(test, reducers) {
    if (!angular.isFunction(test)) {
      throw new Error('Hook test must be a function');
    }

    if (
      !angular.isArray(reducers)
      || reducers.length === 0
      || reducers.filter((reduce) => !angular.isFunction(reduce)).length > 0
    ) {
      throw new Error('Hook reducers must be an array of function');
    }

    this.test = test;
    this.reducers = reducers;
    this.calls = 0;
  }

  attemptRun(action, state, isForce = false) {
    if (isForce || this.test(action)) {
      this.reducers.reduce((state, reduce) => {
        return reduce(state, ++this.calls);
      }, state);
    }
  }
}

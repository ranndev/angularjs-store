import Hook from './hook';
import HookLink from './hook-link';

export default class Hooks {
  constructor() {
    this.hooks = [];
  }

  addHook(actionQuery, reducers, initialRunState) {
    let test = null;

    if (angular.isString(actionQuery)) {
      test = (action) => action === actionQuery;
    } else if (angular.isArray(actionQuery)) {
      test = (action) => actionQuery.includes(action);
    } else if (actionQuery instanceof RegExp) {
      test = (action) => actionQuery.test(action);
    } else {
      throw new Error('Action query must be either a string, array or regexp');
    }

    if (!angular.isObject(initialRunState)) {
      throw new Error('Hook initial run state should be an object');
    }

    const hook = new Hook(test, reducers);
    this.hooks.push(hook);

    // Initial run of hook
    hook.attemptRun(null, initialRunState, true);

    return new HookLink(() => {
      this.hooks.splice(this.hooks.indexOf(hook), 1);
    });
  }

  attemptRunAll(action, state) {
    this.hooks.forEach((hook) => {
      hook.attemptRun(action, state);
    });
  }
}

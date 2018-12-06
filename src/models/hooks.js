import Hook from './hook';
import HookLink from './hook-link';

export default class Hooks {
  constructor() {
    this.hooks = [];
  }

  addHook(test, reducers, initialRunState) {
    if (!angular.isObject(initialRunState)) {
      throw new Error('Hook initial run state should be an object');
    }

    const hook = new Hook(test, reducers);

    this.hooks.push(hook);
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

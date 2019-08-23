import Hook, { HookCallback, HookMatcher } from './models/hook';
import HookLink from './models/hook-link';
import hold, { StateHolder } from './models/state-holder';

/* istanbul ignore next */
if (__DEV__) {
  if (!angular) {
    console.warn('Seems like you forgot to load angular? Make sure to load it first before the angularjs-store.');
  }
}

export type HookActionQuery<Actions extends string[] = string[]> =
  | '*'
  | Actions[number]
  | Array<Actions[number] | '*'>
  | RegExp;

export default class NgStore<State extends { [key: string]: any } = {}, Actions extends string[] = string[]> {
  private $$stateHolder: StateHolder<State>;

  /** All registered hooks from the store */
  private $$hooks: Array<Hook<State>> = [];

  /**
   * Create a Store.
   *
   * @param initialState - Initial state value.
   */
  constructor(initialState: State) {
    this.$$stateHolder = hold(initialState);
  }

  /**
   * Get a new copy of state.
   */
  public copy(): State {
    return this.$$stateHolder.get();
  }

  /**
   * Attach a hook to the store and get notified everytime the given query matched the dispatched action.
   *
   * @param query - A query for the dispatched action.
   * @param callback - Invoke when query match to dispatched action.
   */
  public hook(query: HookActionQuery<Actions>, callback: HookCallback<State>) {
    let matcher: HookMatcher;

    if (typeof query === 'string') {
      if (query === '*') {
        matcher = () => true;
      } else {
        matcher = (action) => action === query;
      }
    } else if (Array.isArray(query)) {
      matcher = (action) => query.indexOf(action) > -1;
    } else if (query instanceof RegExp) {
      matcher = (action) => query.test(action);
    } else {
      throw new Error('Hook action query must be a either string, array of string or regular expression.');
    }

    const hook = new Hook<State>(matcher, callback);

    this.$$hooks.push(hook);

    // Initial run of hook.
    hook.run('', this.$$stateHolder.get(), true);

    return new HookLink(() => {
      this.$$hooks.splice(this.$$hooks.indexOf(hook), 1);
    });
  }

  /**
   * Dispatch an action for updating state.
   *
   * @param action - Action name.
   * @param state - Store new state.
   */
  public dispatch(action: Actions[number], state: Partial<State>): void;

  /**
   * Dispatch an action for updating state.
   *
   * @param action - Action name.
   * @param setState - State setter with the access to previous state.
   */
  public dispatch(action: Actions[number], setState: (prevState: State) => Partial<State>): void;

  /**
   * Implementation.
   */
  public dispatch(action: Actions[number], state: Partial<State> | ((prevState: State) => Partial<State>)) {
    if (angular.isFunction(state)) {
      this.$$stateHolder.set(state(this.$$stateHolder.get()));
    } else {
      this.$$stateHolder.set(state);
    }

    for (const hook of this.$$hooks) {
      hook.run(action, this.$$stateHolder.get());
    }
  }
}

import angular from 'angular';
import Hook, { HookCallback, HookMatcher } from './models/hook';
import HookLink from './models/hook-link';
import StateHolder, { create } from './models/state-holder';

export type HookActionQuery = string | string[] | RegExp;

export default class NgStore<State> {
  private $$stateHolder: StateHolder<State>;

  /** All registered hooks from the store */
  private $$hooks: Array<Hook<State>> = [];

  /**
   * Create a Store.
   *
   * @param initialState - Initial state value.
   */
  constructor(initialState: State) {
    this.$$stateHolder = create(initialState);
  }

  /**
   * Get a new copy of state.
   */
  public copy(): State;

  /**
   * Get a new copy of state's specific property.
   *
   * @param prop - Property name of state data.
   */
  public copy(prop: keyof State): State[keyof State];

  /**
   * Implementation.
   */
  public copy(prop?: keyof State) {
    return this.$$stateHolder.get(prop);
  }

  /**
   * Attach a hook to the store and get notified everytime the given query matched the dispatched action.
   *
   * @param query - Used to query the dispatched action.
   * @param callback - Invoke when query match to dispatched action.
   */
  public hook(query: HookActionQuery, callback: HookCallback<State>) {
    let matcher: HookMatcher;

    if (typeof query === 'string') {
      matcher = (action) => action === query;
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
    hook.run('', this.$$stateHolder.get() as State, true);

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
  public dispatch(action: string, state: Partial<State>): void;

  /**
   * Dispatch an action for updating state.
   *
   * @param action - Action name.
   * @param setState - State setter with the access to previous state.
   */
  // tslint:disable-next-line: unified-signatures
  public dispatch(action: string, setState: (prevState: State) => Partial<State>): void;

  /**
   * Implementation.
   */
  public dispatch(action: string, state: Partial<State> | ((prevState: State) => Partial<State>)) {
    if (angular.isFunction(state)) {
      this.$$stateHolder.set(
        state(this.$$stateHolder.get() as State),
      );
    } else {
      this.$$stateHolder.set(state);
    }

    for (const hook of this.$$hooks) {
      hook.run(action, this.$$stateHolder.get() as State);
    }
  }
}

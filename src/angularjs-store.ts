import Hook, { HookCallback, HookMatcher } from './models/hook';
import HookLink from './models/hook-link';
import holdState, { StateHolder } from './models/state-holder';

/* istanbul ignore next */
if (__DEV__) {
  if (!angular) {
    console.warn('Seems like you forgot to load angular. Make sure to load it first before the angularjs-store.');
  }
}

export type HookActionQuery<Actions extends string[] = string[]> =
  | '*'
  | Actions[number]
  | Array<Actions[number] | '*'>
  | RegExp;

export default class NgStore<State extends { [key: string]: any } = {}, Actions extends string[] = string[]> {
  private $$stateHolder: StateHolder<State>;

  /**
   * All registered hooks from the store.
   */
  private $$hooks: Array<Hook<State>> = [];

  /**
   * Create a Store.
   * @param initialState Initial state value.
   */
  constructor(initialState: State) {
    /* istanbul ignore next */
    if (__DEV__) {
      if (Object.prototype.toString.call(initialState) !== '[object Object]') {
        console.warn(
          'Initializing the store with a non-object state is not recommended.\n',
          "If you're trying to create a store with primitive type state, try wrap it in object.",
        );
      }
    }

    this.$$stateHolder = holdState(initialState);
  }

  /**
   * Get a new copy of state.
   */
  public copy(): State {
    return this.$$stateHolder.get();
  }

  /**
   * Attach a hook to the store and get notified everytime the given query matched to dispatched action.
   * @param query A query for the dispatched action.
   * @param callback Invoke when query match to dispatched action.
   */
  public hook(query: HookActionQuery<Actions>, callback: HookCallback<State>) {
    let matcher: HookMatcher;

    if (typeof query === 'string') {
      matcher = query === '*' ? () => true : (action) => action === query;
    } else if (Array.isArray(query)) {
      /* istanbul ignore next */
      if (__DEV__) {
        const nonStringQueryItem = query.find((queryItem) => typeof queryItem !== 'string');

        if (nonStringQueryItem) {
          console.warn(
            `Hook action query contains non-string value (${nonStringQueryItem}).\n`,
            'Using array as query must only contains string.',
          );
        }
      }

      matcher = (action) => query.includes(action);
    } else if (query instanceof RegExp) {
      matcher = (action) => query.test(action);
    } else {
      /* istanbul ignore next */
      if (__DEV__) {
        throw new Error('Hook action query must be a either string, array of string, or regular expression.');
      }

      /* istanbul ignore next */
      throw new TypeError('Invalid hook query.');
    }

    if (!angular.isFunction(callback)) {
      /* istanbul ignore next */
      if (__DEV__) {
        throw new Error('Hook callback must be a function.');
      }

      /* istanbul ignore next */
      throw new TypeError('Invalid hook callback.');
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
   * @param action Action name.
   * @param state New state of store.
   */
  public dispatch(action: Actions[number], state: Partial<State>): void;

  /**
   * Dispatch an action for updating state.
   * @param action Action name.
   * @param setState State setter.
   */
  public dispatch(action: Actions[number], setState: (prevState: State) => Partial<State>): void;

  /**
   * Implementation.
   */
  public dispatch(action: Actions[number], state: Partial<State> | ((prevState: State) => Partial<State>)) {
    const partialState = angular.isFunction(state) ? state(this.$$stateHolder.get()) : state;

    /* istanbul ignore next */
    if (__DEV__) {
      if (Object.prototype.toString.call(partialState) !== '[object Object]') {
        console.warn(
          "You're about to update the state using a non-object value.\n",
          'Did you use non-object state?\n',
          'If yes, store with a non-object state is not recommended.\n',
          'Primitive type state must wrap by object.',
        );
      }
    }

    this.$$stateHolder.set(partialState);

    for (const hook of this.$$hooks) {
      hook.run(action, this.$$stateHolder.get());
    }
  }
}

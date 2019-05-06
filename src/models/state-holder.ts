import angular from 'angular';

export interface IStateHolder<State> {
  /**
   * Get a new copy of state or just a specific property of it.
   *
   * @param prop - Property name of state data.
   */
  get(prop?: keyof State): State | State[keyof State];

  /**
   * Update the state.
   *
   * @param state - New state.
   */
  set(state: Partial<State>): void;
}

/**
 * Create a StoreHolder.
 *
 * @param initialState - Initial state value.
 */
export default function createStateHolder<State>(initialState: State): IStateHolder<State> {
  let $$state: State = angular.copy(initialState);

  function get(prop?: keyof State) {
    return angular.copy(prop ? $$state[prop] : $$state);
  }

  function set(state: Partial<State>) {
    $$state = angular.merge({}, $$state, state);
  }

  return { get, set };
}

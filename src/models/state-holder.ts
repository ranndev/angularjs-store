import angular from 'angular';

// tslint:disable-next-line: interface-name
export default interface StateHolder<State> {
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

export function create<State>(initialState: State): StateHolder<State> {
  let $$state: State = angular.copy(initialState);

  function get(prop?: keyof State) {
    return angular.copy(prop ? $$state[prop] : $$state);
  }

  function set(state: Partial<State>) {
    $$state = angular.merge({}, $$state, state);
  }

  return { get, set };
}

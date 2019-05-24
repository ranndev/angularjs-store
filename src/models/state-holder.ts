import angular from 'angular';

export type StateCopier<State> = (partialState: Partial<State>, prevState: State) => State;

export interface StateHolder<State> {
  /**
   * Get a new copy of state.
   */
  get(): State;

  /**
   * Get a new copy of state's specific property.
   *
   * @param prop - Property name of state data.
   */
  get(prop: keyof State): State[keyof State];

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
 * @param copier - Custom state copier.
 */
export default function createStateHolder<State>(initialState: State, copier?: StateCopier<State>) {
  let $$state: State = angular.copy(initialState);

  function get(prop?: keyof State) {
    return angular.copy(prop ? $$state[prop] : $$state);
  }

  function set(state: Partial<State>) {
    if (copier) {
      $$state = copier(state, $$state);
    } else {
      for (const key in state) {
        if (state.hasOwnProperty(key) && key in $$state) {
          $$state[key] = angular.copy(state[key]!);
        }
      }
    }
  }

  return { get, set } as StateHolder<State>;
}

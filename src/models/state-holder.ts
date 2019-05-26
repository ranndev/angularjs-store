import angular from 'angular';

export type StateCopier<State> = (prevState: State, partialState?: Partial<State>) => State;

export interface StateHolder<State> {
  /**
   * Get a new copy of state.
   */
  get(): State;

  /**
   * Update the state.
   *
   * @param state - Partial of new state.
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

  function get() {
    let stateCopy: State;

    if (copier) {
      stateCopy = copier($$state);
    } else {
      stateCopy = {} as State;

      for (const key in $$state) {
        if ($$state.hasOwnProperty(key)) {
          stateCopy[key] = angular.copy($$state[key]);
        }
      }
    }

    return stateCopy;
  }

  function set(state: Partial<State>) {
    if (copier) {
      $$state = copier($$state, state);
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

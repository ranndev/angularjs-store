import angular from 'angular';

export interface StateHolder<State> {
  /**
   * Get a new copy of state.
   */
  get(): State;

  /**
   * Update the current state.
   *
   * @param partialState - New partial state.
   */
  set(partialState: Partial<State>): void;
}

export default function hold<State>(state: State): StateHolder<State> {
  const $$state = angular.copy(state);

  const get = () => {
    return angular.copy($$state);
  };

  const set = (partialState: Partial<State>) => {
    for (const key in partialState) {
      if (partialState.hasOwnProperty(key) && key in $$state) {
        $$state[key] = angular.copy(partialState[key])!;
      }
    }
  };

  return { get, set };
}

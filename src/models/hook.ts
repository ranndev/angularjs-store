export type HookMatcher = (action: string) => boolean;

export type HookCallback<State> = (state: Readonly<State>, initialRun: boolean) => void;

export default class Hook<State> {
  private $$match: HookMatcher;
  private $$callback: HookCallback<State>;
  private $$called = false;

  /**
   * Create a Hook.
   *
   * @param matcher - Function that will test the dispatched action.
   * @param callback - Callback function that trigger when action passed to matcher.
   */
  constructor(matcher: HookMatcher, callback: HookCallback<State>) {
    this.$$match = matcher;
    this.$$callback = callback;
  }

  /**
   * Run the pipes with the given state when the action passed to matcher.
   *
   * @param action - Action name.
   * @param state - A state to pass on every pipe.
   * @param force - Ignore the action checking and run the pipes. Default: `false`.
   */
  public run(action: string, state: Readonly<State>, force = false) {
    if (!force && !this.$$match(action)) {
      return;
    }

    this.$$callback(state, !this.$$called);
    this.$$called = true;
  }
}

export type HookMatcher = (action: string) => boolean;

export type HookCallback<State> = (state: Readonly<State>, initialRun: boolean) => void;

export default class Hook<State> {
  private $$match: HookMatcher;
  private $$callback: HookCallback<State>;
  private $$called = false;

  /**
   * Create a Hook.
   * @param matcher Function that test the dispatched action.
   * @param callback Callback function that trigger when action passed to matcher.
   */
  constructor(matcher: HookMatcher, callback: HookCallback<State>) {
    this.$$match = matcher;
    this.$$callback = callback;
  }

  /**
   * Run the registered callback when action passed to matcher.
   * @param action Action name.
   * @param state A state to pass in callback.
   * @param force Ignore the action checking and run the callback forcely. Disabled by default.
   */
  public run(action: string, state: Readonly<State>, force = false) {
    if (!force && !this.$$match(action)) {
      return;
    }

    this.$$callback(state, !this.$$called);
    this.$$called = true;
  }
}

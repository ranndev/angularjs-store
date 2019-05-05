import { IScope } from 'angular';

export default class HookLink {
  private $$destroyer: () => void;

  /**
   * Create a HookLink.
   *
   * @param destroyer - Destroyer function.
   */
  constructor(destroyer: () => void) {
    this.$$destroyer = destroyer;
  }

  /**
   * Invoke the destroyer function.
   */
  public destroy() {
    this.$$destroyer();
  }

  /**
   * Bind hook to scope. Automatically destroy the hook link when the scope destroyed.
   *
   * @param scope - The scope where to bound the HookLink.
   */
  public destroyOn(scope: IScope) {
    scope.$on('$destroy', () => {
      this.$$destroyer();
    });
  }
}

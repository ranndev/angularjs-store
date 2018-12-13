class HookLink {
  /**
   * @constructor
   * @param {function} destroyer destroyer function.
   * @returns {HookLink}
   */
  constructor(destroyer) {
    if (!angular.isFunction(destroyer)) {
      throw new Error('HookLink destroyer must be a function');
    }

    this.destroyer = destroyer;
  }

  /**
   * Directly call the destroyer function.
   */
  destroy() {
    this.destroyer();
  }

  /**
   * Attach the destroyer function to $scope $destroy hook.
   * @param {object} scope angular scope.
   */
  destroyOn(scope) {
    scope.$on('$destroy', () => {
      this.destroyer();
    });
  }
}

export default HookLink;

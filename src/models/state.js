class State {
  /**
   * @constructor
   * @param {object} initialData initial data of state.
   * @returns {State}
   */
  constructor(initialData) {
    this.data = angular.copy(initialData);
  }

  /**
   * Get a new copy of state data.
   * @param {string} prop optional. key to get a specific property in state.
   */
  get(prop) {
    if (angular.isDefined(prop)) {
      return angular.copy(this.data[prop]);
    } else {
      return angular.copy(this.data);
    }
  }

  /**
   * Update a state data.
   * @param {object} newData data that merge to the current state data.
   */
  set(newData) {
    return angular.merge(this.data, newData);
  }
}

export default State;

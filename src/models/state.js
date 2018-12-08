export default class State {
  constructor(initialData) {
    if (!angular.isObject(initialData)) {
      throw new Error('State initial data must be an object');
    }

    this.initialData = angular.copy(initialData);
    this.data = angular.copy(this.initialData);
  }

  get(prop) {
    if (angular.isDefined(prop)) {
      return angular.copy(this.data[prop]);
    } else {
      return angular.copy(this.data);
    }
  }

  set(newData) {
    return angular.merge(this.data, newData);
  }

  reset() {
    this.data = angular.copy(this.initialData);
  }
}

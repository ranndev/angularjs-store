export default class State {
  constructor(initialData, customCopier) {
    if (!angular.isObject(initialData)) {
      throw new Error('State initial data must be an object');
    }

    if (angular.isDefined(customCopier) && !angular.isFunction(customCopier)) {
      throw new Error('State custom copier must be a function')
    }

    this.copy = customCopier || angular.copy;
    this.initialData = this.copy(initialData);
    this.data = this.copy(this.initialData);
  }

  get(prop) {
    if (angular.isDefined(prop)) {
      return this.copy(this.data[prop]);
    } else {
      return this.copy(this.data);
    }
  }

  set(newData) {
    return this.copy(newData, this.data);
  }

  reset() {
    this.data = this.copy(this.initialData);
  }
}

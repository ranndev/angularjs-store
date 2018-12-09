function StoreLogger() {
  class Logger {
    constructor(name) {
      this.name = name;
    }

    logDispatch(action) {
      console.clear();
      console.log(`${this.name}: Dispatching action ${action}...`);
    }

    logHook() {
      console.log(`${this.name}: Action query passed! Running hook...`); 
    }
  }

  return {
    create: function (name) {
      return new Logger(name);
    }
  };
}

export default [StoreLogger];

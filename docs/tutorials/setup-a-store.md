# Setup a store

To create a store we need to import and use the `NgStore` class.

```javascript
import NgStore from 'angularjs-store';

const initialState = {count: 0};
const counterStore = new NgStore(initialState);
```

Make the store injectable by attaching it to AngularJS service. In the example below we named it `CounterStore`.

```javascript
import NgStore from 'angularjs-store';

angular
  .module('appModule')
  .factory('CounterStore', function CounterStore() {
    const initialState = {count: 0};
    const counterStore = new NgStore(initialState);

    return counterStore;
  });
```

Hooray!🎆 We're done creating our first store.


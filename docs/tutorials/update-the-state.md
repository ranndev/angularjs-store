# Update the state

In AngularJS Store, updating a state is same as dispatching an action. Whenever we send an update to the store, it should have a label or the action name \(later we are going to see the purpose of action name on updating state\).

Store state are immutable. There are no way to update the state directly. The only solution to do that is by using the [`dispatch`](../api-reference/dispatch.md) method of store. In this example we are going to dispatch an action \(`INCREMENT_COUNT` and `DECREMENT_COUNT`\) to increment and decrement the state `count`.

{% code-tabs %}
{% code-tabs-item title="controller-b.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerB', function ControllerB(CounterStore) {
    let currentCount;
    
    currentCount = CounterStore.copy('count');
    CounterStore.dispatch('INCREMENT_COUNT', {
      count: currentCount + 1;
    });
    
    currentCount = CounterStore.copy('count');
    CounterStore.dispatch('DECREMENT_COUNT', {
      count: currentCount - 1;
    });
  });
```
{% endcode-tabs-item %}

{% code-tabs-item title="controller-a.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerA', function ControllerA($scope, CounterStore) {
    $scope.count = CounterStore.copy('copy');
  });
```
{% endcode-tabs-item %}

{% code-tabs-item title="counter-store.js" %}
```javascript
import NgStore from 'angularjs-store';

angular
  .module('App', [])
  .factory('CounterStore', function CounterStore() {
    const initialState = { count: 0 };
    const counterStore = new NgStore(initialState);

    return counterStore;
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

As we can notice in the above example, every time we dispatch or update the state we get first the current value of `count` and store it to `currentCount`. We need that because our update is based on the current state.

`dispatch` has a way to easily do that by using `function` as a second parameter. We can get the current state from this function on its first  argument. The function should be return an `object` or the update for state.

```javascript
angular
  .module('App', [])
  .controller('ControllerB', function ControllerB(CounterStore) {
    CounterStore.dispatch('INCREMENT_COUNT', function (state) {
      return {count: state.count + 1};
    });

    CounterStore.dispatch('DECREMENT_COUNT', function (state) {
      return {count: state.count - 1};
    });
  });
```

Or a more simplified way using ES6 fat arrow and destructuring.

```javascript
angular
  .module('App', [])
  .controller('ControllerB', function ControllerB(CounterStore) {
    CounterStore.dispatch('INCREMENT_COUNT', ({count}) => ({count: count + 1}));
    CounterStore.dispatch('DECREMENT_COUNT', ({count}) => ({count: count - 1}));
  });
```




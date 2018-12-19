# Update the state

In AngularJS Store, updating a state is same as dispatching an action. Whenever we send an update to the store, it should have a label or the action name \(later we are going to see the purpose of action name on updating state\).

Store state are immutable. There are no way to update the state directly. The only solution to do that is by using the [`dispatch`](../api-reference/dispatch.md) method of store. In this example we are going to dispatch an action \(`INCREMENT_COUNT` and `DECREMENT_COUNT`\) to increment and decrement the state `count`.

{% code-tabs %}
{% code-tabs-item title="controller-b.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerB', function ControllerB($scope, CounterStore) {
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




# Get notified on state changes

To listen on state changes we need to attach a "hook" in the store using the [`hook`](../api-reference/hook.md) method. Every hook has an "action query" which make itself to trigger only on a certain condition. If the dispatched action was passed to action query, hook reducers will be called.

To see that in action, here's a simple example of hook which querying or listening to action `INCREMENT_COUNT` and `DECREMENT_COUNT`.

{% code-tabs %}
{% code-tabs-item title="controller-c.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerC', function ControllerC($scope, CounterStore) {
    CounterStore.hook('INCREMENT_COUNT', (state) => {
      $scope.count = state.count;
    });
  
    CounterStore.hook('DECREMENT_COUNT', ({ count }) => {
      $scope.count = count;
    });
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="warning" %}
All the attached hook has an initial phase which make its reducers to run after the hook is being attached. During hook initial phase reducers will be invoked even there is no dispatched action yet.
{% endhint %}

{% hint style="info" %}
To determine if the reducer is running on its initial phase we can use the second argument from reducer function which hold the count of hook invocation.
{% endhint %}

Since we only update the scope variable `count` on `INCREMENT_COUNT` and `DECREMENT_COUNT` action from the example above, we can simplified that by doing a multiple query action in a hook.

{% code-tabs %}
{% code-tabs-item title="controller-c.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerC', function ControllerC($scope, CounterStore) {
    CounterStore.hook(['INCREMENT_COUNT', 'DECREMENT_COUNT'], ({ count }) => {
      $scope.count = count;
    });
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

We can also use RegExp for multiple action query.

{% code-tabs %}
{% code-tabs-item title="controller-c.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerC', function ControllerC($scope, CounterStore) {
    CounterStore.hook(/^(IN|DE)CREMENT_COUNT$/, ({ count }) => {
      $scope.count = count;
    });
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Another great feature of AngularJS Store hook aside from multiple action query is the support for multiple reducers. We can pipe multiple reducers to get our desired result.

{% code-tabs %}
{% code-tabs-item title="controller-c.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerC', function ControllerC($scope, CounterStore) {
    CounterStore.hook(/^(IN|DE)CREMENT_COUNT$/, [
      ({ count }) => {
        return (count % 2) === 0;
      }, (isEven) => {
        return isEven ? 'EVEN' : 'ODD';
      }, (oddEvenString) => {
        $scope.oddEvenString = oddEvenString;
      }
    ]);
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}




# Stop from receiving notifications

Whenever we add a hook in the store it always return a `HookLink` instance that represents the link between the hook and the store. We can use it to stop our hook from getting notified on any dispatched action.

In this example we use the `destroy` method to manually destroy the hook when it reach its 3rd invocation.

{% hint style="warning" %}
`hookLink` is only available inside reducers after hook initial phase.
{% endhint %}

{% code-tabs %}
{% code-tabs-item title="controller-d.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerD', function ControllerD($scope, CounterStore) {
    const hookLink = CounterStore.hook('INCREMENT_COUNT', (state, calls) => {
      $scope.count = state.count;
      
      if (calls === 3) {
        hookLink.destroy();
      }
    });
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Another method of `HookLink` is `destroyOn`. This method is used for auto destroying of hook. It basically bind the hook to AngularJS scope so when the scope destroyed also hook is get destroyed. 

{% code-tabs %}
{% code-tabs-item title="controller-d.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerD', function ControllerD($scope, CounterStore) {
    CounterStore.hook('INCREMENT_COUNT', (state) => {
      $scope.count = state.count;
    }).destroyOn($scope);
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}


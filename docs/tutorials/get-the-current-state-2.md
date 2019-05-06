# Get the current state

After creating a store, let's try to consume it into our app. To get the current state we need to use the [`copy`](../api-reference/copy.md) method of the store.

In this example we inject the store into the app controller to populate the scope variable `count`.

{% code-tabs %}
{% code-tabs-item title="controller-a.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerA', function ControllerA($scope, CounterStore) {
    const counterState = CounterStore.copy();
    $scope.count = counterState.count;
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

We can also pass a `string` to the [`copy`](../api-reference/copy.md) method to directly access the state property. Just like this example. 

{% code-tabs %}
{% code-tabs-item title="controller-a.js" %}
```javascript
angular
  .module('App', [])
  .controller('ControllerA', function ControllerA($scope, CounterStore) {
    $scope.count = CounterStore.copy('count');
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}

{% hint style="info" %}
All returned data by the [copy](../api-reference/copy.md) method are just only a new state copy. Any changes to that copy does not reflect to other copy and most importantly, it does not reflect to the original state in the store.
{% endhint %}


# Get the current state

After creating a store, let's try to consume it into our app. To get the current state we need to use the `copy` method of the store. See the [`copy` documentation](../api-reference/copy.md).

In this example we inject the store into the app component named `ComponentA` to populate the scope variable `count`.

```javascript
function ComponentA($scope, CounterStore) {
  // Option 1
  const state = CounterStore.copy();
  $scope.count = state.count;

  // Option 2
  $scope.count = CounterStore.copy('count');
}
```


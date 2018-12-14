# Stop from receiving notifications

Whenever we add a hook in the store it will always return a `HookLink` instance that represents the link between the hook and the store. If we want to stop our hooks from receiving a dispatched action, we can use that `HookLink` instance. It has two methods: `destroy` which we can use for manual destroying and `destroyOn` for auto destroying of hooks. After the hook destroyed it will no longer receive any dispatched action from store.

Let's see how to use that methods in this example.

```javascript
function ComponentC($scope, CounterStore) {
  const hookLink = CounterStore.hook('INCREMENT_COUNT', (state) => {
    $scope.count = state.count;
  });

  // Manual Destroying
  hookLink.destroy();

  // Auto Destroying
  // hookLink destroyed right after the $scope destroyed
  hookLink.destroyOn($scope);

  // Short syntax for auto destroying
  CounterStore.hook('INCREMENT_COUNT', (state) => {
    $scope.count = state.count;
  }).destroyOn($scope);
}
```


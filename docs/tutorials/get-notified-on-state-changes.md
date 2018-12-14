# Get notified on state changes

To listen on state changes we need to attach a `hook` in the store using the `hook` method \(See [`hook` documentation](../api-reference/hook.md)\). Every hook has an "action query" which make itself to trigger only on a certain condition. If the dispatched action was passed to action query, hook reducers will be called.

To see that in action, we have a component in here named `ComponentC` which inject the `CounterStore`.

```javascript
function ComponentC($scope, CounterStore) {
  // Listen for INCREMENT_COUNT action
  CounterStore.hook('INCREMENT_COUNT', (state) => {
    $scope.count = state.count;
  });

  // Listen for DECREMENT_COUNT action
  CounterStore.hook('DECREMENT_COUNT', ({count}) => {
    $scope.count = count;
  });

  // Listen for INCREMENT_COUNT and DECREMENT_COUNT action using array
  CounterStore.hook(['INCREMENT_COUNT', 'DECREMENT_COUNT'], ({count}) => {
    $scope.count = count;
  });

  // Listen for INCREMENT_COUNT and DECREMENT_COUNT action using RegExp
  CounterStore.hook(/^(IN|DE)CREMENT_COUNT$/, ({count}) => {
    $scope.count = count;
  });

  // Pipe multiple reducers to generate a desired result
  CounterStore.hook(/^(IN|DE)CREMENT_COUNT$/, ({count}) => {
    return (count % 2) === 0;
  }, (isEven) => {
    return isEven ? 'EVEN' : 'ODD';
  }, (oddEvenString) => {
    $scope.oddEvenString = oddEvenString;
  });
}
```


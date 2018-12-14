---
description: Listen to certain dispatched action.
---

# hook

**@paramaters**

| Name | Type | Description |
| :--- | :--- | :--- |
| _**actionQuery**_ | `string`  `string[]` `RegExp` | Query that control the hook to only respond on certain dispatched actions. It can be a `string` for querying single action or it can be an array of `string` or `RegExp` to query multiple actions. |
| _**...reducers**_ | `function` | Function\(s\) that called after the dispatched action are passed to `actionQuery` test. |

**@return**

_HookLink instance_ - it has a `destroy` and `destroyOn` method for removing the hook from store.

**Examples:**

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




# Update the state

In AngularJS Store, updating a state is same as dispatching an action. Whenever we send an update, it should have a label or the action name.

In this example, we have a component named `ComponentB` which then inject the `CounterStore` and dispatch an action \(`INCREMENT_COUNT` and `DECREMENT_COUNT`\) to increment and decrement the state `count`. Here we are going to use the store `dispatch` method \(See [`dispatch` documentation](../api-reference/dispatch.md)\).

```javascript
function ComponentB(CounterStore) {
  // Option 1
  // Using object
  let count;

  count = CounterStore.copy('count');
  CounterStore.dispatch('INCREMENT_COUNT', {count: count + 1});

  count = CounterStore.copy('count');
  CounterStore.dispatch('DECREMENT_COUNT', {count: count - 1});

  // Option 2
  // Using callback function
  CounterStore.dispatch('INCREMENT_COUNT', ({count}) => {
    return {count: count + 1};
  });

  CounterStore.dispatch('DECREMENT_COUNT', ({count}) => {
    return {count: count - 1};
  });
}
```


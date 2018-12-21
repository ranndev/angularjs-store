# dispatch

Send an update to store.

**@parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| _**action**_ | `string` | Action label. |
| _**newState**_ | `object` `function` | New state that will merge to current state. Exceeded properties are not restricted. |

**@return**

| Type | Description |
| :--- | :--- |
| `undefined` |  |

**Examples:**

```javascript
const store = new NgStore({foo: true});

// Get the latest value of foo
let foo = store.copy('foo');

// Toggle the foo from store
// {foo: false}
store.dispatch('TOGGLE_FOO', {foo: !foo});
```

Another option for updating the state. Using function, we can now omit the code from line 4 on the first example because the current state is already on the parameter of callback function.

```javascript
const store = new NgStore({foo: true});

// Toggle the foo from store
// {foo: false}
store.dispatch('TOGGLE_FOO', (state) => {
    return {foo: !state.foo};
});
```




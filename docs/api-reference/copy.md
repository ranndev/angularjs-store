# copy

Get a copy of current state.

#### @parameters

| Name | Type | Description |
| :--- | :--- | :--- |
| _**stateProp**_ | `string` | Optional. Specific property of state. |

**@return**

New copy of state.

**Examples:**

Copying the whole state

```javascript
const store = new NgStore({foo: 2, bar: 1});

// {foo: 2, bar: 1}
const stateCopy = store.copy();
```

Copying specific property of state

```javascript
const store = new NgStore({foo: {bar: 3, baz: 4}});

// {bar: 3, baz: 4}
const fooCopy = store.copy('foo');
```




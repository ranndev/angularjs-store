# NgStore

A class for creating stores.

**@parameters**

| Name | Type | Description |
| :--- | :--- | :--- |
| _**initialState**_ | `object` | Initial state of store. |

**@return**

| Type | Description |
| :--- | :--- |
| `NgStore` | New `NgStore` instance. |

#### Examples:

```javascript
const loaderStore = new NgStore({
    visible: false,
    label: 'Loading...'
});
```




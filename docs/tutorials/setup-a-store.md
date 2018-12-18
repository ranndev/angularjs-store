# Setup a store

To create a store we need to import and use the [`NgStore`](../api-reference/ngstore.md) class.

{% code-tabs %}
{% code-tabs-item title="counter-store.js" %}
```javascript
import NgStore from 'angularjs-store';

const initialState = { count: 0 };
const counterStore = new NgStore(initialState);
```
{% endcode-tabs-item %}
{% endcode-tabs %}

Make the store injectable by attaching it to AngularJS service. This will make our store available everywhere in our app. In the example below we named it `CounterStore`.

{% code-tabs %}
{% code-tabs-item title="counter-store.js" %}
```javascript
import NgStore from 'angularjs-store';

angular
  .module('App', [])
  .factory('CounterStore', function CounterStore() {
    const initialState = { count: 0 };
    const counterStore = new NgStore(initialState);

    return counterStore;
  });
```
{% endcode-tabs-item %}
{% endcode-tabs %}




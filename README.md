# AngularJS Store - NgStore

![AngularJS Store with AngularJS](./images/favicon-with-angularjs.png)

AngularJS Store will guide you to create a one-way data flow in your application (Single Source of Truth). Manage your AngularJS application's state into a very predictable way.

[![Build Status](https://travis-ci.com/ranndev/angularjs-store.svg?branch=master)](https://travis-ci.com/ranndev/angularjs-store)
[![codecov](https://codecov.io/gh/ranndev/angularjs-store/branch/develop/graph/badge.svg)](https://codecov.io/gh/ranndev/angularjs-store)
[![Greenkeeper badge](https://badges.greenkeeper.io/ranndev/angularjs-store.svg)](https://greenkeeper.io/)

## Installation

**NPM**

```
npm install --save angularjs-store
```

**Yarn**

```
yarn add angularjs-store
```

**CDN**

```html
<!-- For development -->
<script src="https://cdn.jsdelivr.net/npm/angularjs-store@4.0.1/dist/umd/angularjs-store.js"></script>

<!-- For production -->
<script src="https://cdn.jsdelivr.net/npm/angularjs-store@4.0.1/dist/umd/angularjs-store.min.js"></script>
```

## Quick Start

This tutorial will quickly get you started for the basics of AngularJS Store.
For more advanced tutorials, check out the [Tutorials with Javascript](https://angularjs-store.gitbook.io/docs/tutorials-with-javascript) or [Tutorials with Typescript](https://angularjs-store.gitbook.io/docs/tutorials-with-typescript) from the [official documentation](https://angularjs-store.gitbook.io/docs).

**Creating a store**

First, you need to import the `NgStore` class from `angularjs-store` or if you are using CDN, `NgStore` class is globally available.

```javascript
const initialState = { count: 0 };
const counterStore = new NgStore(initialState);
```

**Making the store injectable**

Wrapping the store by AngularJS service to make it injectable.

```javascript
const app = angular.module('app', []);

app.service('counterStore', function counterStore() {
  const initialState = { count: 0 };
  const counterStore = new NgStore(initialState);

  return counterStore;
});
```

**Getting the current state**

Using the `copy` method to get a copy of state.

```javascript
const app = angular.module('app', []);

app.controller('YourController', function YourController($scope, counterStore) {
  const counterState = counterStore.copy(); // { count: 0 }
  $scope.count = counterState.count; // 0
});
```

**Updating the state**

Using the `dispatch` for updating the state.

```javascript
const app = angular.module('app', []);

app.controller('YourController', function YourController(counterStore) {
  // counterStore.copy() = { count: 0 }

  counterStore.dispatch('INCREMENT_COUNT', (currentState) => {
    return { count: currentState.count + 1 };
  });

  // counterStore.copy() = { count: 1 }

  counterStore.dispatch('DECREMENT_COUNT', (currentState) => {
    return { count: currentState.count - 1 };
  });

  // counterStore.copy() = { count: 0 }
});
```

**Listening on state changes**

Using the `hook` method to listen on dispatched actions.

```javascript
const app = angular.module('app', []);

app.controller('YourController', function YourController($scope, counterStore) {
  counterStore.hook('INCREMENT_COUNT', (counterState) => {
    $scope.count = counterState.count;
  });

  counterStore.hook('DECREMENT_COUNT', (counterState) => {
    $scope.count = counterState.count;
  });
});
```

**Stop listening on dispatched actions**

```javascript
const app = angular.module('app', []);

app.controller('YourController', function YourController($scope, counterStore) {
  const hookLink = counterStore.hook('INCREMENT_COUNT', (state) => {
    $scope.count = state.count;

    // Destory the HookLink when count reaches 10.
    // After the HookLink gets destroyed, the hook will no longer receive any dispatched actions.
    if ($scope.count === 10) {
      hookLink.destroy();
    }
  });
});
```

## Documentation

- Official Documentation - https://angularjs-store.gitbook.io/docs

## Demo

- Sample App - https://angularjs-store-demo.netlify.com
- Source Code - https://github.com/ranndev/angularjs-store-demo

## Contributing

AngularJS Store is an open source project and we love to receive contributions from our community — you! There are many ways to contribute, from writing tutorials or blog posts, improving the documentation, submitting bug reports and feature requests. See the [guidelines](CONTRIBUTING).

## Collaborators

- [Rannie Peralta](https://github.com/ranndev)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

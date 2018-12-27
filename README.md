# AngularJS Store

AngularJS Store will guide you to create a one way data flow in your application (Single Source of Truth). Manage your AngularJS application state into a very predicable way.

![](https://img.shields.io/github/license/rannie-peralta/angularjs-store.svg)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/rannie-peralta/angularjs-store/issues)
[![Build Status](https://travis-ci.com/rannie-peralta/angularjs-store.svg?branch=master)](https://travis-ci.com/rannie-peralta/angularjs-store)
![](https://img.shields.io/snyk/vulnerabilities/github/rannie-peralta/angularjs-store.svg)

[![NPM](https://nodei.co/npm/angularjs-store.png)](https://nodei.co/npm/angularjs-store/)

## Table of contents

* [Demo](#demo)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Tutorials and Examples](#tutorials-and-examples)
  * [Setup a store](#setup-a-store)
  * [Get the current state](#get-the-current-state)
  * [Update the state](#update-the-state)
  * [Get notified on state changes](#get-notified-on-state-changes)
  * [Stop from receiving notifications](#stop-from-receiving-notifications)
* [Documentation](#documentation)
  * [NgStore](#ngstore)
  * [copy](#copy)
  * [dispatch](#dispatch)
  * [hook](#hook)
* [Contributing](#contributing)
* [Authors](#authors)
* [Lisence](#license)

## Demo

[AngularJS Store Demo](https://angularjsstore-demo.netlify.com/) (Working in progress)

## Prerequisites

* `AngularJS v1.x.x` (version 2 of Angular and up are not supported)

## Installation

Via NPM:

```
npm install angularjs-store --save
```

Via Yarn:

```
yarn add angularjs-store
```

CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/angularjs-store@2.0.5/lib/angularjs-store.min.js" integrity="sha256-D6tCzcJC7U7OxwdO4Pn/n4fAUuyG5KQ4sGHHEEeTQNI=" crossorigin="anonymous"></script>
```

## Tutorials and Examples

In this series of examples we will create a simple counter store that holds a `count` state. After that, we are going to setup and use it to our AngularJS application.

### Setup a store

To create a store we need to import and use the `NgStore` class.

```javascript
import NgStore from 'angularjs-store';

const initialState = {count: 0};
const counterStore = new NgStore(initialState);
```

Make the store injectable by attaching it to AngularJS service. In the example below we named it `CounterStore`.

```javascript
import NgStore from 'angularjs-store';

angular
  .module('appModule')
  .factory('CounterStore', function CounterStore() {
    const initialState = {count: 0};
    const counterStore = new NgStore(initialState);

    return counterStore;
  });
```

### Get the current state

After creating a store, let's try to consume it into our app. To get the current state we need to use the `copy` method of the store. See the [`copy` documentation](#copy) below.

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

### Update the state

In AngularJS Store, updating a state is same as dispatching an action. Whenever we send an update, it should have a label or the action name.

In this example, we have a component named `ComponentB` which then inject the `CounterStore` and dispatch an action (`INCREMENT_COUNT` and `DECREMENT_COUNT`) to increment and decrement the state `count`. Here we are going to use the store `dispatch` method (See [`dispatch` documentation](#dispatch)).

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

### Get notified on state changes

To listen on state changes we need to attach a `hook` in the store using the `hook` method (See the documentation below for more details about `hook`). Every hook has an "action query" which make itself to trigger only on a certain condition. If the dispatched action was passed to action query, hook reducers will be called.

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

### Stop from receiving notifications

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

## Documentation

### NgStore

A class for creating stores.

**parameters**

_**initialState**:object_ - initial state of store.

### copy

Get a copy of current state.

**parameters**

_**stateProp**:string_ - Optional. specific property of state.

### dispatch

Send an state update to store.

**parameters**

_**action**:string_ - action label.

_**newState**:(object|function)_ - new state that will merge to current state. Exceeded properties are not restricted.

### hook

Listen to certain dispatched action.

**parameters**

_**actionQuery**:(string|string[]|RegExp)_ - query that control the hook to only repond on certain dispatched actions. It can be a `string` for querying single action or it can be an array of `string` or `RegExp` to query multiple actions.

_**...reducers**:(function)_ - function(s) that called after the dispatched action are passed to `actionQuery` test. 

**return**

_HookLink instance_ - it has a `destroy` and `destroyOn` method for removing the hook from store.

## Contributing

1. Fork it (https://github.com/rannie-peralta/angularjs-store/fork)
2. Create your feature branch (`git checkout -b feature/foobar`)
3. Commit your changes (`git commit -am 'Add some foobar'`)
4. Push to the branch (`git push origin feature/foobar`)
5. Create your Pull Request

## Authors

* **Rannie Peralta** - https://github.com/rannie-peralta

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

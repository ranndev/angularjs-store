import NgStore from 'lib/angularjs-store';

function GroupAStore() {
  const store = new NgStore({
    stateA: {name: 'A', value: 'Apple'},
    stateB: {name: 'B', value: 'Ball'},
    stateC: {name: 'C', value: 'Cat'},
  });

  console.log(store.constructor.name)

  return store;
}

export default [GroupAStore];

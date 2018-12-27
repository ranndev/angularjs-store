import NgStore from 'lib';

function GroupAStore() {
  const store = new NgStore({
    stateA: { name: 'A', value: 'Apple' },
    stateB: { name: 'B', value: 'Ball' },
    stateC: { name: 'C', value: 'Cat' },
  });

  return store;
}

export default [GroupAStore];

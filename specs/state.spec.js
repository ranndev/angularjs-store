/* eslint-disable no-new */

import State from 'src/models/state';
import { expect } from 'chai';
import benv from 'benv';

before((done) => {
  benv.setup(() => {
    benv.expose({
      angular: benv.require('../../node_modules/angular/angular.js', 'angular'),
    });

    done();
  });
});

describe('State', () => {
  it('should be a function', () => {
    expect(State).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    expect(() => { State({}); }).to.throw();
    expect(() => { new State({}); }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of State', () => {
      const state = new State({});

      expect(state.constructor.name).to.equal('State');
      expect(state).to.be.an.instanceof(State);
    });

    it('should exactly have a data property', () => {
      const state = new State({});

      expect(state).to.have.keys('data');
    });

    it('should respond to get and set method', () => {
      const state = new State({});

      expect(state).to.respondTo('get');
      expect(state).to.respondTo('set');
    });
  });

  context('get method', () => {
    it('should return a new copy of state', () => {
      const initialData = { foo: 'bar' };
      const state = new State(initialData);

      expect(state.get()).to.not.equal(initialData);
      expect(state.get()).to.not.equal(state.data);

      const data = state.get();
      data.foo = 'fooo';

      expect(state.get()).to.not.deep.equal(data);
    });

    it('should get a single property of state', () => {
      const state = new State({ foo: 'bar' });

      expect(state.get('foo')).to.equal('bar');
    });
  });

  context('set method', () => {
    it('should update the state', () => {
      const state = new State({ foo: 'bar', bar: 'foo' });
      const newState = state.set({ bar: 'fooooooo' });

      expect(newState).to.deep.equal({ foo: 'bar', bar: 'fooooooo' });
    });
  });
});

after(() => {
  benv.teardown();
});

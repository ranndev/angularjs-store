import State from 'src/models/state';
import {expect} from 'chai';
import benv from 'benv';

before(function(done) {
  benv.setup(function() {    
    benv.expose({
      angular: benv.require('../../node_modules/angular/angular.js', 'angular')
    });

    done();
  });
});

describe('State', () => {
  it('should be a function', () => {
    expect(State).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    const noop = angular.noop;

    expect(() => { State({}, noop) }).to.throw();
    expect(() => { new State({}, noop) }).to.not.throw();
  });

  it('should require first parameter (initialData) to be an object', () => {
    const noop = angular.noop;

    expect(() => { new State(null, noop) }).to.throw();
    expect(() => { new State(undefined, noop) }).to.throw();
    expect(() => { new State(true, noop) }).to.throw();
    expect(() => { new State('foo', noop) }).to.throw();
    expect(() => { new State(123, noop) }).to.throw();
    expect(() => { new State(function () {}, noop) }).to.throw();
    expect(() => { new State({}, noop) }).to.not.throw();
  });

  it('should second parameter (customCopier) to be a function if provided', () => {
    const noop = angular.noop;

    expect(() => { new State({}, null) }).to.throw();
    expect(() => { new State({}, true) }).to.throw();
    expect(() => { new State({}, 'foo') }).to.throw();
    expect(() => { new State({}, 123) }).to.throw();
    expect(() => { new State({}, []) }).to.throw();
    expect(() => { new State({}, {}) }).to.throw();
    expect(() => { new State({}, function () {}) }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of State', () => {
      const state = new State({}, angular.noop);

      expect(state.constructor.name).to.equal('State');
      expect(state).to.be.an.instanceof(State);
    });

    it('should exactly have a data, initialData and copy property', () => {
      const state = new State({}, angular.noop);

      expect(state).to.have.all.keys('data', 'initialData', 'copy');
    });

    it('should have a copy, get, set and reset method', () => {
      const state = new State({}, angular.noop);

      expect(state).to.respondTo('get');
      expect(state).to.respondTo('set');
      expect(state).to.respondTo('reset');
    });
  });

  context('get method', () => {
    it('should return a new copy of state', () => {
      const initialData = {foo: 'bar'};
      const state = new State(initialData);

      expect(state.get()).to.not.equal(initialData);
      expect(state.get()).to.not.equal(state.data);
    });

    it('should get a single property of state', () => {
      const initialData = {foo: 'bar'};
      const state = new State(initialData);
      
      expect(state.get('foo')).to.equal('bar');
    });
  });

  context('set method', () => {
    it('should update the state', () => {
      const initialData = {foo: 'bar'};
      const state = new State(initialData);

      const newState = state.set({foo: 'foo', bar: 'bar'});
      expect(newState).to.deep.include({foo: 'foo'});
      expect(newState).to.deep.equal({foo: 'foo', bar: 'bar'});
    });
  });

  context('reset method', () => {
    it('should reset state to initial data', () => {
      const initialData = {foo: 'bar'};
      const state = new State(initialData);

      state.set({foo: 'foo', bar: 'bar'});
      state.reset();
      expect(state.get()).to.deep.equal({foo: 'bar'});
    });
  });
});

after(function() {
  benv.teardown();
});

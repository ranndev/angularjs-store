import NgStore from 'src/angularjs-store';
import HookLink from 'src/models/hook-link';
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

describe('NgStore', () => {
  it('should be a function', () => {
    expect(NgStore).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    expect(() => { NgStore({}) }).to.throw();
    expect(() => { new NgStore({}) }).to.not.throw();
  });

  it('should require the first parameter (initialState) to be an object', () => {
    expect(() => { new NgStore() }).to.throw();
    expect(() => { new NgStore(null) }).to.throw();
    expect(() => { new NgStore(true) }).to.throw();
    expect(() => { new NgStore('foo') }).to.throw();
    expect(() => { new NgStore(123) }).to.throw();
    expect(() => { new NgStore(function () {}) }).to.throw();
    expect(() => { new NgStore([]) }).to.throw();
    expect(() => { new NgStore({}) }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of NgStore', () => {
      const store = new NgStore({});

      expect(store.constructor.name).to.equal('NgStore');
      expect(store).to.be.an.instanceof(NgStore);
    });

    it('should only have a $$id property', () => {
      const store = new NgStore({});

      expect(store).to.have.all.keys('$$id');
    });

    it('should respond to copy, dispatch and hook method', () => {
      const store = new NgStore({});

      expect(store).to.respondTo('copy');
      expect(store).to.respondTo('dispatch');
      expect(store).to.respondTo('hook');
    });
  });

  context('copy method', () => {
    it('should return a new copy of state', () => {
      const initialState = {foo: 'bar'};
      const store = new NgStore(initialState);

      expect(store.copy()).to.not.equal(initialState);
      expect(store.copy()).to.deep.equal(initialState);
    });

    it('should return a specific state property if stateProp is provided', () => {
      const store = new NgStore({foo: 'bar'});

      expect(store.copy('foo')).to.equal('bar');
    });
  });

  context('hook method', () => {
    it('should require first parameter (actionQuery) to be either a string, array of string or regexp', () => {
      const store = new NgStore({foo: 'bar'});

      expect(() => { store.hook(undefined, angular.noop) }).to.throw();
      expect(() => { store.hook(null, angular.noop) }).to.throw();
      expect(() => { store.hook(true, angular.noop) }).to.throw();
      expect(() => { store.hook(123, angular.noop) }).to.throw();
      expect(() => { store.hook('ACTION', angular.noop) }).to.not.throw();
      expect(() => { store.hook(['ACTION_1', 'ACTION_2'], angular.noop) }).to.not.throw();
      expect(() => { store.hook(/^ACTION_(1|2)$/, angular.noop) }).to.not.throw();
    });

    it('should require the remaining parameter (reducers) to be all function', () => {
      const store = new NgStore({foo: 'bar'});

      expect(() => { store.hook('ACTION') }).to.throw();
      expect(() => { store.hook('ACTION', null) }).to.throw();
      expect(() => { store.hook('ACTION', true) }).to.throw();
      expect(() => { store.hook('ACTION', 'foo') }).to.throw();
      expect(() => { store.hook('ACTION', 123) }).to.throw();
      expect(() => { store.hook('ACTION', []) }).to.throw();
      expect(() => { store.hook('ACTION', {}) }).to.throw();
      expect(() => { store.hook('ACTION', function () {}, null) }).to.throw();
      expect(() => { store.hook('ACTION', function () {}) }).to.not.throw();
      expect(() => { store.hook('ACTION', function () {}, function () {}) }).to.not.throw();
    });

    it('should return a HookLink instance', () => {
      const store = new NgStore({foo: 'bar'});

      expect(store.hook('ACTION', angular.noop)).to.be.an.instanceof(HookLink);
    });
  });

  context('dispatch method', () => {
    it('should require first parameter (action) to a string', () => {
      const store = new NgStore({foo: 'bar'});

      expect(() => { store.dispatch(undefined, {}) }).to.throw();
      expect(() => { store.dispatch(null, {}) }).to.throw();
      expect(() => { store.dispatch(true, {}) }).to.throw();
      expect(() => { store.dispatch(123, {}) }).to.throw();
      expect(() => { store.dispatch({}, {}) }).to.throw();
      expect(() => { store.dispatch([], {}) }).to.throw();
      expect(() => { store.dispatch(function () {}, {}) }).to.throw();
      expect(() => { store.dispatch('ACTION', {}) }).to.not.throw();
    });

    it('should require the second parameter (newState) to be either an object or function', () => {
      const store = new NgStore({foo: 'bar'});

      expect(() => { store.dispatch('ACTION') }).to.throw();
      expect(() => { store.dispatch('ACTION', null) }).to.throw();
      expect(() => { store.dispatch('ACTION', true) }).to.throw();
      expect(() => { store.dispatch('ACTION', 'foo') }).to.throw();
      expect(() => { store.dispatch('ACTION', 123) }).to.throw();
      expect(() => { store.dispatch('ACTION', []) }).to.throw();
      expect(() => { store.dispatch('ACTION', {}) }).to.not.throw();
      expect(() => { store.dispatch('ACTION', function () {}) }).to.not.throw();
    });

    it('should update the state', () => {
      const initialState = {foo: 'bar'};
      const store = new NgStore(initialState);
      const newState = {foo: 'foo', bar: 'bar'};

      store.dispatch('UPDATE', newState);

      expect(store.copy()).to.not.equal(initialState);
      expect(store.copy()).to.not.deep.equal(initialState);
      expect(store.copy()).to.not.equal(newState);
      expect(store.copy()).to.deep.equal(newState);
    });

    it('should run all hooks by different actions', () => {
      const initialState = {foo: 'bar', bar: 'foo'};
      const store = new NgStore(initialState);
      const initialRunCount = 1;
      const fooHookRunExpectedCount = 5;
      const barHookRunExpectedCount = 3;
      const foobarHookRunExpectedCount = fooHookRunExpectedCount + barHookRunExpectedCount;
      let fooHookRunCount = 0;
      let barHookRunCount = 0;
      let foobarHookRunCount = 0;

      store.hook('UPDATE_FOO', () => {
        fooHookRunCount++;
      });

      store.hook('UPDATE_BAR', () => {
        barHookRunCount++;
      });

      store.hook(/^UPDATE_(FOO|BAR)$/, () => {
        foobarHookRunCount++;
      });

      for (let i = 0; i < fooHookRunExpectedCount; i++) {
        store.dispatch('UPDATE_FOO', {});
      }

      for (let i = 0; i < barHookRunExpectedCount; i++) {
        store.dispatch('UPDATE_BAR', {});
      }

      expect(fooHookRunCount).to.equal(fooHookRunExpectedCount + initialRunCount);
      expect(barHookRunCount).to.equal(barHookRunExpectedCount + initialRunCount);
      expect(foobarHookRunCount).to.equal(foobarHookRunExpectedCount + initialRunCount);
    });
  });
});

after(function() {
  benv.teardown();
});

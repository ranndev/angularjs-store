import StateFactory from 'src/models/state-factory';
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

describe('StateFactory', () => {
  it('should be a function', () => {
    expect(StateFactory).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    expect(() => { StateFactory() }).to.throw();
    expect(() => { new StateFactory() }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of StateFactory', () => {
      const factory = new StateFactory();

      expect(factory.constructor.name).to.equal('StateFactory');
      expect(factory).to.be.an.instanceof(StateFactory);
    });

    it('should respond to register and getHooks method', () => {
      const factory = new StateFactory();

      expect(factory).to.respondTo('register');
      expect(factory).to.respondTo('getState');
    });
  });

  context('register method', () => {
    it('should add an entry to the factory', () => {
      const factory = new StateFactory();
      const storeId = 1;

      expect(factory.storesState[storeId]).to.be.undefined;

      factory.register(storeId);

      expect(factory.storesState[storeId]).to.be.ok;
      expect(factory.storesState[storeId]).to.be.an.instanceof(State);
    });
  });

  context('getState method', () => {
    it('should return the registered state', () => {
      const factory = new StateFactory();
      const storeId = 1;

      factory.register(storeId);

      expect(factory.getState(storeId)).to.be.an.instanceof(State);
    });
  });
});

after(function() {
  benv.teardown();
});

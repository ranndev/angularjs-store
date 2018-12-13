/* eslint-disable no-new */

import Hooks from 'src/models/hooks';
import Hook from 'src/models/hook';
import HookLink from 'src/models/hook-link';
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

describe('Hooks', () => {
  it('should be a function', () => {
    expect(Hooks).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    expect(() => { Hooks(); }).to.throw();
    expect(() => { new Hooks(); }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of Hooks', () => {
      const hooks = new Hooks();

      expect(hooks.constructor.name).to.equal('Hooks');
      expect(hooks).to.be.an.instanceof(Hooks);
    });

    it('should have an initial empty array hooks', () => {
      const hooks = new Hooks();

      // eslint-disable-next-line no-unused-expressions
      expect(hooks.hooks).to.be.an('array').that.is.an.empty;
    });

    it('should have a hooks property', () => {
      const hooks = new Hooks();

      expect(hooks).to.have.keys('hooks');
    });

    it('should respond to addHook and attemptRunAll methods', () => {
      const hooks = new Hooks();

      expect(hooks).to.respondTo('addHook');
      expect(hooks).to.respondTo('attemptRunAll');
    });
  });

  context('addHook method', () => {
    it('should add an entry of hook', () => {
      const hooks = new Hooks();

      hooks.addHook(angular.noop, [angular.noop], new State({}));

      expect(hooks.hooks).to.have.a.lengthOf(1);
      expect(hooks.hooks[0]).to.be.an.instanceof(Hook);
    });

    it('should return a HookLink instance', () => {
      const hooks = new Hooks();
      const hookLink = hooks.addHook(angular.noop, [angular.noop], new State({}));

      expect(hookLink).to.be.an.instanceof(HookLink);
    });
  });

  context('attemptRunAll method', () => {
    it('should attempt to run all hooks', () => {
      let hookRunAttempts = 0;
      const expectedRunAttempts = 3;
      const reducerStub = () => { hookRunAttempts += 1; };
      const hooks = new Hooks();

      for (let i = 0; i < expectedRunAttempts; i += 1) {
        hooks.addHook(() => true, [reducerStub], new State({}));
      }

      expect(hookRunAttempts).to.equal(expectedRunAttempts);
    });
  });
});

after(() => {
  benv.teardown();
});

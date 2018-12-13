/* eslint-disable no-new */

import Hook from 'src/models/hook';
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

describe('Hook', () => {
  it('should be a function', () => {
    expect(Hook).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    const { noop } = angular;

    expect(() => { Hook(noop, [noop]); }).to.throw();
    expect(() => { new Hook(noop, [noop]); }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of Hook', () => {
      const hook = new Hook(angular.noop, [angular.noop]);

      expect(hook.constructor.name).to.equal('Hook');
      expect(hook).to.be.an.instanceof(Hook);
    });

    it('should have a calls, reducers and test property', () => {
      const hook = new Hook(angular.noop, [angular.noop]);

      expect(hook).to.have.all.keys('calls', 'reducers', 'test');
    });

    it('should respond to attemptRun method', () => {
      const hook = new Hook(angular.noop, [angular.noop]);

      expect(hook).to.respondTo('attemptRun');
    });
  });

  context('attemptRun method', () => {
    it('should run all reducers if test is passed', () => {
      let reducersCalledCount = 0;
      const test = () => true;
      const reducersCount = 3;
      const reducer = () => { reducersCalledCount += 1; };
      const reducers = [];

      for (let i = 0; i < reducersCount; i += 1) {
        reducers.push(reducer);
      }

      const hook = new Hook(test, reducers);
      const state = new State({});

      hook.attemptRun('', state);

      expect(reducersCalledCount).to.equal(reducersCount);
    });

    it('should skip running reducers if test is failed', () => {
      let reducersCalledCount = 0;
      const test = () => false;
      const reducersCount = 3;
      const reducer = () => { reducersCalledCount += 1; };
      const reducers = [];

      for (let i = 0; i < reducersCount; i += 1) {
        reducers.push(reducer);
      }

      const hook = new Hook(test, reducers);
      const state = new State({});

      hook.attemptRun('', state);

      expect(reducersCalledCount).to.equal(0);
    });

    it('should run all reducers forcely even test is failed', () => {
      let reducersCalledCount = 0;
      const test = () => false;
      const reducersCount = 3;
      const reducer = () => { reducersCalledCount += 1; };
      const reducers = [];
      const isForce = true;

      for (let i = 0; i < reducersCount; i += 1) {
        reducers.push(reducer);
      }

      const hook = new Hook(test, reducers);
      const state = new State({});

      hook.attemptRun('', state, isForce);

      expect(reducersCalledCount).to.equal(reducersCount);
    });
  });
});

after(() => {
  benv.teardown();
});

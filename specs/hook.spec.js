import Hook from 'src/models/hook';
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

describe('Hook', () => {
  it('should be a function', () => {
    expect(Hook).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    const noop = angular.noop;

    expect(() => { Hook(noop, [noop]) }).to.throw();
    expect(() => { new Hook(noop, [noop]) }).to.not.throw();
  });

  it('should require first parameter to be a function', () => {
    const noop = angular.noop;

    expect(() => { new Hook(null, [noop]) }).to.throw();
    expect(() => { new Hook(undefined, [noop]) }).to.throw();
    expect(() => { new Hook(true, [noop]) }).to.throw();
    expect(() => { new Hook('foo', [noop]) }).to.throw();
    expect(() => { new Hook(123, [noop]) }).to.throw();
    expect(() => { new Hook(function () {}, [noop]) }).to.not.throw();
  });

  it('should require second parameter to be an array of function', () => {
    const noop = angular.noop;

    expect(() => { new Hook(noop, null) }).to.throw();
    expect(() => { new Hook(noop, undefined) }).to.throw();
    expect(() => { new Hook(noop, true) }).to.throw();
    expect(() => { new Hook(noop, 'foo') }).to.throw();
    expect(() => { new Hook(noop, 123) }).to.throw();
    expect(() => { new Hook(noop, []) }).to.throw();
    expect(() => { new Hook(noop, ['bar', noop]) }).to.throw();
    expect(() => { new Hook(noop, [noop]) }).to.not.throw();
    expect(() => { new Hook(noop, [noop, function () {}, () => {}]) }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of Hook', () => {
      const hook = new Hook(angular.noop, [angular.noop]);

      expect(hook.constructor.name).to.equal('Hook');
      expect(hook).to.be.an.instanceof(Hook);
    });

    it('should exactly have a calls, reducers and test property and attemptRun method', () => {
      const hook = new Hook(angular.noop, [angular.noop]);
      
      expect(hook).to.have.all.keys('calls', 'reducers', 'test');
      expect(hook).to.respondTo('attemptRun');
    });
  });
});

after(function() {
  benv.teardown();
});

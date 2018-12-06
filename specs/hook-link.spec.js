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

describe('HookLink', () => {
  it('should be a function', () => {
    expect(HookLink).to.be.a('function');
  });

  it('should only call with a \'new\' keyword', () => {
    const noop = angular.noop;

    expect(() => { HookLink(noop) }).to.throw();
    expect(() => { new HookLink(noop) }).to.not.throw();
  });

  it('should require first parameter to be a function', () => {
    expect(() => { new HookLink() }).to.throw();
    expect(() => { new HookLink(null) }).to.throw();
    expect(() => { new HookLink(undefined) }).to.throw();
    expect(() => { new HookLink(true) }).to.throw();
    expect(() => { new HookLink('foo') }).to.throw();
    expect(() => { new HookLink(123) }).to.throw();
    expect(() => { new HookLink(function () {}) }).to.not.throw();
  });

  context('instance', () => {
    it('should be an instance of HookLink', () => {
      const hookLink = new HookLink(angular.noop);

      expect(hookLink.constructor.name).to.equal('HookLink');
      expect(hookLink).to.be.an.instanceof(HookLink);
    });

    it('should have a destroy and bindDestroy methods', () => {
      const hookLink = new HookLink(angular.noop);

      expect(hookLink).to.respondTo('destroy');
      expect(hookLink).to.respondTo('bindDestroy');
    });
  });
});

after(function() {
  benv.teardown();
});

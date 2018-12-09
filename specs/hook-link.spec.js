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

    it('should respond to destroy and destroyOn methods', () => {
      const hookLink = new HookLink(angular.noop);

      expect(hookLink).to.respondTo('destroy');
      expect(hookLink).to.respondTo('destroyOn');
    });
  });

  context('destroy method', () => {
    it('should call the destroyer function', () => {
      let isDestroyerCalled = false;
      const destroyer = () => { isDestroyerCalled = true }
      const hookLink = new HookLink(destroyer);

      hookLink.destroy();

      expect(isDestroyerCalled).to.be.true;
    });
  });

  context('destroyOn method', () => {
    it('should call the destroyer function after scope $destroy is triggered', () => {
      let scopeStub = {
        hookLinkDestroyer: null,
        triggerDestroy() {
          this.hookLinkDestroyer();
        },
        $on(event, callback) {
          this.hookLinkDestroyer = callback;
        }
      }

      let isDestroyerCalled = false;
      const destroyer = () => { isDestroyerCalled = true }
      const hookLink = new HookLink(destroyer);

      hookLink.destroyOn(scopeStub);
      scopeStub.triggerDestroy();

      expect(isDestroyerCalled).to.be.true;
    });
  });
});

after(function() {
  benv.teardown();
});

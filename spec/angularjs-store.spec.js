import NgStore from 'src/angularjs-store';
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

describe('AngularJS Store', () => {

  context('Constructor', () => {
    it('should be a function', () => {
      expect(NgStore).to.be.a('function');
    });

    it('should only accept object for initial state', () => {
      expect(() => { new NgStore('foo') }).to.throw();
      expect(() => { new NgStore(1) }).to.throw();
      expect(() => { new NgStore(null) }).to.throw();
      expect(() => { new NgStore(undefined) }).to.throw();
      expect(() => { new NgStore(function () {}) }).to.throw();
      expect(() => { new NgStore({}) }).to.not.throw();
    });

    it('should only accept function for custom copier', () => {
      expect(() => { new NgStore({}, 'foo') }).to.throw();
      expect(() => { new NgStore({}, 1) }).to.throw();
      expect(() => { new NgStore({}, true) }).to.throw();
      expect(() => { new NgStore({}, false) }).to.not.throw();
      expect(() => { new NgStore({}, null) }).to.not.throw();
      expect(() => { new NgStore({}, undefined) }).to.not.throw();
      expect(() => { new NgStore({}, function () {}) }).to.not.throw();
    });

    it('should instance have a constructor name "NgStore"', () => {
      const store = new NgStore({});
      
      expect(store.constructor.name).to.equal('NgStore');
    });
  });

  // TODO
  context('Method - copy', () => {
    it('initial state should not be equal to a copy', () => {
      const initialState = {foo: 'hello', bar: {x: 300, y: 200}};
      const store = new NgStore(initialState);

      expect(initialState === store.copy()).to.equal(false);
      expect(initialState.bar === store.copy('bar')).to.equal(false);
    });
  });

  // TODO
  context('Method - dispatch', () => {
    it('TODO', () => {});
  });

  // TODO
  context('Method - hook', () => {
    it('TODO', () => {});
  });
});

after(function() {
  benv.teardown();
});

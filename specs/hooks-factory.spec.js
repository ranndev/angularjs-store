import HooksFactory from 'src/models/hooks-factory';
import Hooks from 'src/models/hooks';
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

describe('HooksFactory', () => {
  it('should be a function', () => {
    expect(HooksFactory).to.be.a('function');
  });

  context('instance', () => {
    it('should be an instance of HooksFactory', () => {
      const factory = new HooksFactory();

      expect(factory.constructor.name).to.equal('HooksFactory');
      expect(factory).to.be.an.instanceof(HooksFactory);
    });

    it('should have register and getHooks method', () => {
      const factory = new HooksFactory();

      expect(factory).to.respondTo('register');
      expect(factory).to.respondTo('getHooks');
    });
  });

  context('register method', () => {
    it('should add an entry to the factory', () => {
      const factory = new HooksFactory();
      const storeId = 1;

      // eslint-disable-next-line no-unused-expressions
      expect(factory.storesHooks[storeId]).to.be.undefined;

      factory.register(storeId);

      // eslint-disable-next-line no-unused-expressions
      expect(factory.storesHooks[storeId]).to.be.ok;
      expect(factory.storesHooks[storeId]).to.be.an.instanceof(Hooks);
    });
  });

  context('getHooks method', () => {
    it('should return the registered hooks', () => {
      const factory = new HooksFactory();
      const storeId = 1;

      factory.register(storeId);

      expect(factory.getHooks(storeId)).to.be.an.instanceof(Hooks);
    });
  });
});

after(() => {
  benv.teardown();
});

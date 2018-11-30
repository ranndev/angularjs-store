import Store from 'src/angularjs-store';
import {expect} from 'chai';
import benv from 'benv';

beforeEach(function(done) {
  benv.setup(function() {
    benv.expose({
      angular: benv.require('../../node_modules/angular/angular.js', 'angular')
    });

    done();
  });
});

describe('AngularJS Store', () => {
  it('should be a function', () => {
    expect(Store).to.be.a('function');
  });
});

afterEach(function() {
  benv.teardown();
});

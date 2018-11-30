import Store from 'src/angularjs-store';
import {expect} from 'chai';

describe('AngularJS Store', () => {
  it('should be a function', () => {
    expect(Store).to.be.a('function');
  });
});

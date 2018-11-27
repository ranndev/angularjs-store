const path = require('path');
const chai = require('chai');
const Store = require(path.join(process.cwd(), 'dist/angularjs-store'));

describe('Store', function () {
  it('shoud be a type of function', function () {
    chai.expect(Store).to.be.a('function');
  });
});

describe('Store Instance', function () {
  it('shoud have a constructor name \'Store\'', function () {
    chai.expect(new Store().constructor.name).to.equal('Store');
  });
});

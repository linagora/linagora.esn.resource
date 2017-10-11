const {expect} = require('chai');
const sinon = require('sinon');

describe('The administrator lib', function() {
  let memberResolver;

  beforeEach(function() {
    memberResolver = {resolve: sinon.stub()};
    this.moduleHelpers.addDep('collaboration', {
      memberResolver
    });
    this.getModule = () => require(this.moduleHelpers.backendPath + '/lib/administrator')(this.moduleHelpers.dependencies);
  });

  describe('The validateTuple function', function() {
    it('should reject when tuple is undefined', function(done) {
      this.getModule().validateTuple()
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.not.have.been.called;
          expect(err.message).to.match(/Tuple must be defined with id and objectType/);
          done();
        });
    });

    it('should reject when tuple.id is undefined', function(done) {
      this.getModule().validateTuple({objectType: 'user'})
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.not.have.been.called;
          expect(err.message).to.match(/Tuple must be defined with id and objectType/);
          done();
        });
    });

    it('should reject when tuple.objectType is undefined', function(done) {
      this.getModule().validateTuple({id: '1'})
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.not.have.been.called;
          expect(err.message).to.match(/Tuple must be defined with id and objectType/);
          done();
        });
    });

    it('should reject when tuple.objectType is not supported', function(done) {
      this.getModule().validateTuple({id: '1', objectType: 'This type is probably not supported at all'})
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.not.have.been.called;
          expect(err.message).to.match(/is not a supported administrator type/);
          done();
        });
    });

    it('should reject when tupleResolver rejects', function(done) {
      const errorMsg = 'I failed to resolve';
      const error = new Error(errorMsg);
      const tuple = {id: '1', objectType: 'user'};

      memberResolver.resolve.returns(Promise.reject(error));

      this.getModule().validateTuple(tuple)
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.have.been.calledWith(tuple);
          expect(err.message).to.equal(errorMsg);
          done();
        });
    });

    it('should reject when tupleResolver does not send back result', function(done) {
      const tuple = {id: '1', objectType: 'user'};

      memberResolver.resolve.returns(Promise.resolve());

      this.getModule().validateTuple(tuple)
        .then(() => {
          done(new Error('Should not occur'));
        })
        .catch(err => {
          expect(memberResolver.resolve).to.have.been.calledWith(tuple);
          expect(err.message).to.match(/has not been found/);
          done();
        });
    });

    it('should resolve with tupleResolver result', function(done) {
      const tuple = {id: '1', objectType: 'user'};
      const result = {foo: 'bar'};

      memberResolver.resolve.returns(Promise.resolve(result));

      this.getModule().validateTuple(tuple)
        .then(value => {
          expect(memberResolver.resolve).to.have.been.calledWith(tuple);
          expect(value).to.equal(result);
          done();
        })
        .catch(() => {
          done(new Error('Should not occur'));
        });
    });
  });
});

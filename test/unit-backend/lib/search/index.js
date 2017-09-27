const { expect } = require('chai');
const sinon = require('sinon');

describe('The search lib', function() {
  let total, offset, limit, hits, query;

  beforeEach(function() {
    total = 50;
    offset = 10;
    limit = 30;
    hits = [1, 2, 3];
    query = {offset, limit};

    this.getModule = () => require(this.moduleHelpers.backendPath + '/lib/search/index')(this.moduleHelpers.dependencies);
  });

  describe('The search function', function() {
    it('should resolve with elasticsearch dependency result', function(done) {
      const result = {hits: {total, hits}};
      const searchDocuments = sinon.spy((query, callback) => callback(null, result));

      this.moduleHelpers.addDep('elasticsearch', { searchDocuments });

      this.getModule().search(query).then(searchResult => {
        expect(searchDocuments).to.have.been.calledWith({
          index: 'resources.idx',
          type: 'resources',
          from: offset,
          size: limit,
          body: sinon.match.object
        });
        expect(searchResult).to.deep.equals({ total_count: total, list: hits });

        done();
      }).catch(done);
    });

    it('should reject when elasticsearch dependency rejects', function(done) {
      const error = new Error('I failed');
      const searchDocuments = sinon.spy((query, callback) => callback(error));

      this.moduleHelpers.addDep('elasticsearch', { searchDocuments });

      this.getModule().search(query)
        .then(done)
        .catch(err => {
          expect(err).to.equal(error);
          done();
        });
    });
  });
});

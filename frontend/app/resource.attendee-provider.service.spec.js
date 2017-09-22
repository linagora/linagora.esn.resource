'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The esnResourceAttendeeProvider service', function() {
  var $q, $rootScope, esnResourceAPIClient, esnResourceAttendeeProvider, ESN_RESOURCE_OBJECT_TYPE;

  beforeEach(function() {
    esnResourceAPIClient = {};
    angular.mock.module('linagora.esn.resource');

    angular.mock.module(function($provide) {
      $provide.value('esnResourceAPIClient', esnResourceAPIClient);
    });

    angular.mock.inject(function(_$rootScope_, _$q_, _esnResourceAttendeeProvider_, _ESN_RESOURCE_OBJECT_TYPE_) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      esnResourceAttendeeProvider = _esnResourceAttendeeProvider_;
      ESN_RESOURCE_OBJECT_TYPE = _ESN_RESOURCE_OBJECT_TYPE_;
    });
  });

  it('should contain the right objectType', function() {
    expect(esnResourceAttendeeProvider.objectType).to.equal(ESN_RESOURCE_OBJECT_TYPE);
    expect(esnResourceAttendeeProvider.searchAttendee).to.be.a.function;
  });

  describe('The searchAttendee function', function() {
    var query, limit, offset;

    beforeEach(function() {
      query = 'searchme';
      limit = 10;
      offset = 0;
    });

    it('should resolve with empty array when call to esnResourceAPIClient.search fails', function(done) {
      esnResourceAPIClient.search = sinon.stub().returns($q.reject(new Error('I failed')));
      esnResourceAttendeeProvider.searchAttendee(query, limit, offset).then(function(result) {
        expect(result).to.be.an('array').that.is.empty;
        expect(esnResourceAPIClient.search).to.have.been.calledWith(query, limit, offset);
        done();
      }, done);

      $rootScope.$digest();
    });

    it('should resolve with esnResourceAPIClient.search result', function(done) {
      var data = [1, 2, 3];
      var response = {data: data};

      esnResourceAPIClient.search = sinon.stub().returns($q.when(response));
      esnResourceAttendeeProvider.searchAttendee(query, limit, offset).then(function(result) {
        expect(esnResourceAPIClient.search).to.have.been.calledWith(query, limit, offset);
        expect(result).to.be.an('array');
        expect(result).to.deep.equals(data);
        done();
      }, done);

      $rootScope.$digest();
    });
  });
});

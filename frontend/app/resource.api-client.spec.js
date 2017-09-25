'use strict';

describe('The esnResourceAPIClient service', function() {
  var $httpBackend, esnResourceAPIClient;

  beforeEach(function() {
    angular.mock.module('linagora.esn.resource');
  });

  beforeEach(function() {
    inject(function(_esnResourceAPIClient_, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      esnResourceAPIClient = _esnResourceAPIClient_;
    });
  });

  describe('The search function', function() {
    it('should call the REST API with right parameters', function(done) {
      var data = [1, 2, 3];
      var term = 'termtosearch';
      var limit = '10';
      var offset = '50';

      $httpBackend.expectGET('/linagora.esn.resource/api/resources?limit=10&offset=50&query=termtosearch').respond(data);
      esnResourceAPIClient.search(term, limit, offset).then(function() {
        done();
      }, done);
      $httpBackend.flush();
    });
  });
});

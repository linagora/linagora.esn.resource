(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .factory('esnResourceAPIClient', esnResourceAPIClient);

  function esnResourceAPIClient(esnResourceRestangular) {
    return {
      create: create,
      search: search
    };

    function create(resource) {
      return _getResources().post(resource);
    }

    function search(query, limit, offset) {
      var options = {
        query: query,
        limit: limit,
        offset: offset
      };

      return _getResources().getList(options);
    }

    function _getResources() {
      return esnResourceRestangular.all('resources');
    }
  }
})(angular);

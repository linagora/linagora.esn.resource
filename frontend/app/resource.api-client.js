(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .factory('esnResourceAPIClient', esnResourceAPIClient);

  function esnResourceAPIClient(esnResourceRestangular) {
    return {
      create: create,
      list: list,
      search: search
    };

    function create(resource) {
      return _getResources().post(resource);
    }

    function list(options) {
      return _getResources().getList(options);
    }

    function search(query, limit, offset) {
      var options = {
        query: query,
        limit: limit,
        offset: offset
      };

      return list(options);
    }

    function _getResources() {
      return esnResourceRestangular.all('resources');
    }
  }
})(angular);

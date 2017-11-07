(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .factory('esnResourceAPIClient', esnResourceAPIClient);

  function esnResourceAPIClient(esnResourceRestangular) {
    return {
      create: create,
      remove: remove,
      get: get,
      list: list,
      search: search
    };

    function create(resource) {
      return _getResources().post(resource);
    }

    function get(id) {
      return _getResources().one(id).get();
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

    function remove(id) {
      return _getResources().one(id).remove();
    }
  }
})(angular);

(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .factory('esnResourceAPIClient', esnResourceAPIClient);

  function esnResourceAPIClient(esnResourceRestangular) {
    return {
      search: search
    };

    function search(query, limit, offset) {
      var options = {
        query: query,
        limit: limit,
        offset: offset
      };

      return esnResourceRestangular.all('resources').getList(options);
    }
  }
})(angular);

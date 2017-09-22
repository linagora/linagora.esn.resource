(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .factory('esnResourceAttendeeProvider', esnResourceAttendeeProvider);

  function esnResourceAttendeeProvider($log, $q, esnResourceAPIClient, ESN_RESOURCE_OBJECT_TYPE) {
    return {
      objectType: ESN_RESOURCE_OBJECT_TYPE,
      searchAttendee: function(query, limit, offset) {
        return esnResourceAPIClient.search(query, limit, offset)
          .then(function(response) {
            return response.data;
          })
          .catch(function(err) {
            $log.error('Error while searching for resources', err);

            return $q.when([]);
          });
      }
    };
  }
})(angular);

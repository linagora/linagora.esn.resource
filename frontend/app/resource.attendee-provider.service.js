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
            return response.data.map(function(resource) {
              resource.email = resource._id + '@' + resource.domain.name;
              resource.displayName = resource.name;

              return resource;
            });
          })
          .catch(function(err) {
            $log.error('Error while searching for resources', err);

            return $q.when([]);
          });
      },
      templateUrl: '/linagora.esn.resource/app/resource.attendee.html'
    };
  }
})(angular);

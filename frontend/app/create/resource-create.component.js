(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .component('esnResourceCreateModal', {
      bindings: {
        type: '=?'
      },
      controller: 'ESNResourceCreateController',
      controllerAs: 'ctrl',
      transclude: true,
      templateUrl: '/linagora.esn.resource/app/create/resource-create.html'
    });
})(angular);

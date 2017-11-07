(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .run(function(dynamicDirectiveService, DynamicDirective, session, _) {
      function isAdmin(scope) {
        return scope.ctrl.resource && _.find(scope.ctrl.resource.administrators, { objectType: 'user', id: session.user._id });
      }

      session.ready.then(function() {
        var directive = new DynamicDirective(isAdmin, 'esn-resource-list-item-dropdown-admin-links');

        dynamicDirectiveService.addInjection('esn-resource-list-item-dropdown', directive);
      });
    });
})(angular);

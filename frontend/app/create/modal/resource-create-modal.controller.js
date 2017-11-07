(function() {
  'use strict';

  angular.module('linagora.esn.resource')
    .controller('ESNResourceCreateController', ESNResourceCreateController);

  function ESNResourceCreateController($modal, $scope, $state, _, esnResourceAPIClient, asyncAction, session, ESN_RESOURCE) {
    var self = this;

    self.beAdmin = true;
    self.submit = submit;
    self.resourceAdministrators = [];
    self.resourceTypes = ESN_RESOURCE.TYPES;
    self.defaultResourceType = 'resource';
    self.selectedType = 'resource';
    self.isSelected = isSelected;

    function isSelected(type) {
      return type === self.selectedType;
    }

    function submit() {
      return asyncAction({
        progressing: 'Creating resource...',
        success: 'Resource has been created',
        failure: 'Failed to create resource'
      }, function() {
        self.resource.type = self.selectedType;
        self.resource.administrators = _.map(self.resourceAdministrators, function(admin) {
          return {
            id: admin._id,
            objectType: 'user'
          };
        });

        if (self.beAdmin) {
          self.resource.administrators.push({
            id: session.user._id,
            objectType: 'user'
          });
        }

        return esnResourceAPIClient.create(self.resource).finally(function() {
          $state.reload();
        });
      });
    }
  }
})();

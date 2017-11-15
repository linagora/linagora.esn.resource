(function() {
  'use strict';

  angular.module('linagora.esn.resource')
    .controller('ESNResourceFormUpdateController', ESNResourceFormUpdateController);

  function ESNResourceFormUpdateController($state, resource, type, _, esnResourceAPIClient, asyncAction, session, ESN_RESOURCE) {
    var self = this;

    self.type = type;
    self.resource = resource;
    self.beAdmin = false;
    self.submit = submit;
    self.resourceAdministrators = [];
    self.resourceTypes = ESN_RESOURCE.TYPES;
    self.defaultResourceType = 'resource';
    self.selectedType = self.resource.type || 'resource';
    self.isSelected = isSelected;
    self.onAdminRemove = onAdminRemove;

    function onAdminRemove(id) {
      _.remove(self.resource.administrators, {
        _id: id
    });
    }

    function isSelected(type) {
      return type === self.selectedType;
    }

    function submit() {
      return asyncAction({
        progressing: 'Updating resource...',
        success: 'Resource has been updated',
        failure: 'Failed to update resource'
      }, function() {

        var administratorsToAdd = _.map(self.resourceAdministrators, function(admin) {
          return {
            id: admin._id,
            objectType: 'user'
          };
        });

        self.resource.administrators = self.resource.administrators.concat(administratorsToAdd);

        var alreadyAdministrator = !!_.find(self.resource.administrators, { id: session.user._id, objectType: 'user' });

        self.resource.type = self.selectedType;

        if (self.beAdmin && !alreadyAdministrator) {
          self.resource.administrators.push({
            id: session.user._id,
            objectType: 'user'
          });
        }

        return esnResourceAPIClient.update(self.resource).finally(function() {
          $state.reload();
        });
      });
    }
  }
})();

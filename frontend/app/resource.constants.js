(function(angular) {
  'use strict';

  angular.module('linagora.esn.resource')
    .constant('ESN_RESOURCE_OBJECT_TYPE', 'resource')
    .constant('ESN_RESOURCE', {
      TYPES: ['admin', 'directory', 'resource', 'calendar'],
      ICONS: {
        default: 'mdi-home',
        'guitar-acoustic': 'mdi-guitar-acoustic',
        home: 'mdi-home',
        laptop: 'mdi-laptop',
        motorbike: 'mdi-motorbike',
        office: 'mdi-office',
        radio: 'mdi-radio',
        soccer: 'mdi-soccer',
        sofa: 'mdi-sofa',
        umbrella: 'mdi-umbrella',
        train: 'mdi-train',
        video: 'mdi-video',
        car: 'mdi-car',
        caravan: 'mdi-caravan',
        'credit-card': 'mdi-credit-card',
        parking: 'mdi-parking',
        deskphone: 'mdi-deskphone',
        phone: 'mdi-phone',
        cellphone: 'mdi-cellphone',
        microphone: 'mdi-microphone',
        tablet: 'mdi-tablet',
        wifi: 'mdi-wifi'
      }
    });
})(angular);

'use strict';

const { SEARCH, RESOURCE } = require('../constants');
const { denormalize, getId} = require('./denormalize');

module.exports = dependencies => {
  const listeners = dependencies('elasticsearch').listeners;

  return {
    getOptions,
    register
  };

  function getOptions() {
    return {
      resources: {
        add: RESOURCE.CREATED
      },
      denormalize,
      getId,
      type: SEARCH.TYPE_NAME,
      index: SEARCH.INDEX_NAME
    };
  }

  function register() {
    return listeners.addListener(getOptions());
  }
};

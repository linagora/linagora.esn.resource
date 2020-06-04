'use strict';

const path = require('path');
const glob = require('glob-all');
const AwesomeModule = require('awesome-module');
const Dependency = AwesomeModule.AwesomeModuleDependency;
const MODULE_NAME = 'linagora.esn.resource';
const FRONTEND_JS_PATH = path.join(__dirname, '/frontend/app/');
const FRONTEND_JS_PATH_BUILD = path.join(__dirname, '/dist/');
const APP_ENTRY_POINT = path.join(FRONTEND_JS_PATH, 'app.js');

module.exports = new AwesomeModule(MODULE_NAME, {
  dependencies: [
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.user', 'user'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.db', 'db'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.collaboration', 'collaboration'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.elasticsearch', 'elasticsearch'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.logger', 'logger'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.pubsub', 'pubsub'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.people', 'people'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.wrapper', 'webserver-wrapper'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.authorization', 'authorizationMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.webserver.middleware.domain', 'domainMW'),
    new Dependency(Dependency.TYPE_NAME, 'linagora.esn.core.i18n', 'i18n')
  ],

  states: {
    lib: function(dependencies, callback) {
      const lib = require('./backend/lib')(dependencies);
      const api = require('./backend/webserver/api')(dependencies);

      return callback(null, {
        api, lib
      });
    },

    deploy: function(dependencies, callback) {
      const webserverWrapper = dependencies('webserver-wrapper');
      const app = require('./backend/webserver/application')(dependencies);

      // Register every exposed frontend scripts
      let frontendJsFilesFullPath, frontendJsFilesUri;

      if (process.env.NODE_ENV !== 'production') {
        frontendJsFilesFullPath = glob.sync([
          APP_ENTRY_POINT,
          FRONTEND_JS_PATH + '**/!(*spec).js'
        ]);

        frontendJsFilesUri = frontendJsFilesFullPath.map(filepath => filepath.replace(FRONTEND_JS_PATH, ''));
      } else {
        frontendJsFilesFullPath = glob.sync([
          FRONTEND_JS_PATH_BUILD + '*.js'
        ]);

        frontendJsFilesUri = frontendJsFilesFullPath.map(filepath => filepath.replace(FRONTEND_JS_PATH_BUILD, ''));
      }

      app.use('/api', this.api);
      webserverWrapper.injectAngularAppModules(MODULE_NAME, frontendJsFilesUri, [MODULE_NAME], ['esn'], {localJsFiles: frontendJsFilesFullPath});
      webserverWrapper.injectLess(MODULE_NAME, [path.join(FRONTEND_JS_PATH, 'resource.less')], 'esn');
      webserverWrapper.addApp(MODULE_NAME, app);

      callback();
    },

    start: function(dependencies, callback) {
      this.lib.start(callback);
    }
  }
});

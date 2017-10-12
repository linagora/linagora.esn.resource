'use strict';

var express = require('express');

module.exports = dependencies => {
  const controller = require('./controller')(dependencies);
  const middleware = require('./middleware')(dependencies);
  const authorizationMW = dependencies('authorizationMW');
  const router = express.Router();

  router.post('/',
    authorizationMW.requiresAPILogin,
    middleware.canCreateResource,
    middleware.validateAdministrators,
    controller.create);

  router.get('/',
    authorizationMW.requiresAPILogin,
    controller.list);

  router.get('/:id',
    authorizationMW.requiresAPILogin,
    middleware.canReadResource,
    middleware.load,
    controller.get);

  router.delete('/:id',
    authorizationMW.requiresAPILogin,
    middleware.load,
    middleware.canDeleteResource,
    controller.remove);

  router.put('/:id',
    authorizationMW.requiresAPILogin,
    middleware.load,
    middleware.canUpdateResource,
    controller.update);

  return router;
};

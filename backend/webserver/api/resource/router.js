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
    controller.create);

  router.get('/:id',
    authorizationMW.requiresAPILogin,
    middleware.canReadResource,
    middleware.load,
    controller.get);

  router.delete('/:id',
    authorizationMW.requiresAPILogin,
    middleware.canDeleteResource,
    middleware.load,
    controller.remove);

  router.put('/:id',
    authorizationMW.requiresAPILogin,
    middleware.canUpdateResource,
    middleware.load,
    controller.update);

  return router;
};

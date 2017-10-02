module.exports = dependencies => {
  const logger = dependencies('logger');
  const resourceLib = require('../../../lib/resource')(dependencies);

  return {
    canCreateResource,
    canReadResource,
    canUpdateResource,
    canDeleteResource,
    load
  };

  function canCreateResource(req, res, next) {
    next();
  }

  function canReadResource(req, res, next) {
    next();
  }

  function canUpdateResource(req, res, next) {
    next();
  }

  function canDeleteResource(req, res, next) {
    if (!userIsResourceCreator(req.user, req.resource)) {
      return res.status(403).json({error: {code: 403, message: 'Forbidden', details: `You can not delete resource ${req.resource.id}`}});
    }

    next();
  }

  function load(req, res, next) {
    resourceLib.get(req.params.id).then(result => {
      if (!result) {
        return res.status(404).json({error: {code: 404, message: 'Not found', details: `Resource ${req.params.id} can not be found`}});
      }

      req.resource = result;
      next();
    }).catch(err => {
      const details = `Error while loading the resource with id ${req.params.id}`;

      logger.error(details, err);
      res.status(500).json({error: {status: 500, message: 'Server Error', details}});
    });
  }

  function userIsResourceCreator(user, resource) {
    return user._id.equals(resource.creator);
  }
};

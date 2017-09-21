module.exports = () => {
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
    next();
  }

  function load(req, res, next) {
    req.resource = {};
    next();
  }
};

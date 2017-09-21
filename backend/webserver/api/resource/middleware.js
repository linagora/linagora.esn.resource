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

  function load(req, res) {
    res.status(404).json({error: {code: 404, message: 'Not found', details: `Resource ${req.params.id} can not be found`}});
  }
};

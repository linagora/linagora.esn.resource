module.exports = dependencies => {
  const logger = dependencies('logger');
  const resourceLib = require('../../../lib/resource')(dependencies);

  return {
    create,
    get,
    list,
    update,
    remove
  };

  function create(req, res) {
    const resource = req.body;

    resource.creator = req.user._id;
    resource.domain = req.user.domains[0].domain_id;

    resourceLib.create(resource).then(result => {
      logger.debug('Resource has been created with id', result.id);
      res.status(201).json(result);
    }).catch(err => {
      logger.error('Error while creating resource', err);
      res.status(500).json({error: {status: 500, message: 'Server Error', details: 'Error while creating the resource'}});
    });
  }

  function get(req, res) {
    res.status(200).json(req.resource);
  }

  function list(req, res) {
    notImplemented(res);
  }

  function update(req, res) {
    notImplemented(res);
  }

  function remove(req, res) {
    notImplemented(res);
  }

  function notImplemented(res) {
    res.status(501).json({error: {status: 501, message: 'Not implemented'}});
  }
};

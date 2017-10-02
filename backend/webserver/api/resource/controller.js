const Q = require('q');

module.exports = dependencies => {
  const logger = dependencies('logger');
  const resourceLib = require('../../../lib/resource')(dependencies);
  const searchLib = require('../../../lib/search')(dependencies);

  return {
    create,
    get,
    list,
    update,
    remove,
    search
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
    req.query.query ? search(req, res) : getList(req, res);
  }

  function getList(req, res) {
    // TODO: Remove me, fake for 'almost done' integration tests
    res.status(200).json([
      {
        _id: 'resourceid1',
        name: 'Room 1',
        description: 'A room',
        domain: {
          _id: '123',
          name: 'open-paas.org'
        }
      },
      {
        _id: 'resourceid2',
        name: 'Room 2',
        description: 'Another room',
        domain: {
          _id: '123',
          name: 'open-paas.org'
        }
      }
    ]);
  }

  function notImplemented(res) {
    res.status(501).json({error: {status: 501, message: 'Not implemented'}});
  }

  function update(req, res) {
    notImplemented(res);
  }

  function remove(req, res) {
    const resource = req.resource;

    resourceLib.remove(resource._id).then(result => {
      if (!result) {
        logger.debug(`Resource ${resource._id} has not been removed`);
        res.status(404).json({error: {status: 404, message: 'Not found'}});
      }

      logger.debug(`Resource ${resource._id} has been removed`);
      res.status(204).send();
    }).catch(err => {
      logger.error('Error while removing resource', err);
      res.status(500).json({error: {status: 500, message: 'Server Error', details: 'Error while removing the resource'}});
    });
  }

  function search(req, res) {
    const query = {
      search: req.query.query,
      limit: req.query.limit,
      offset: req.query.offset,
      sortKey: req.query.sortKey,
      sortOrder: req.query.sortOrder,
      domainId: req.query.domainId
    };

    searchLib.search(query)
      .then(searchResult => {
        res.header('X-ESN-Items-Count', searchResult.total_count);

        return searchResult;
      })
      .then(searchResult => searchResult.list.map(resource => resourceLib.get(resource._id)))
      .then(promises => Q.allSettled(promises))
      .then(resolvedResources => resolvedResources.filter(_ => _.state === 'fulfilled').map(_ => _.value))
      .then(resources => res.status(200).json(resources || []))
      .catch(err => {
        logger.error('Error while searching resources', err);
        res.status(500).json({error: {code: 500, message: 'Server Error', details: 'Error while searching for resources'}});
      });
  }
};

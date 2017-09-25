module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;
  const {RESOURCE} = require('./constants');
  const pubsub = dependencies('pubsub');
  const logger = dependencies('logger');
  const ResourceModel = mongoose.model('Resource');

  return {
    create,
    get
  };

  function create(resource) {
    if (!resource) {
      return Promise.reject(new Error('Resource is required'));
    }

    return new ResourceModel(resource).save()
      .then(res => {
        pubsub.local.topic(RESOURCE.CREATED).publish(res);
        logger.debug(`Resource ${res._id} has been publish on ${RESOURCE.CREATED}`);

        return res;
      });
  }

  function get(id) {
    return ResourceModel.findById(id);
  }
};

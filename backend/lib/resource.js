module.exports = dependencies => {
  const mongoose = dependencies('db').mongo.mongoose;
  const ResourceModel = mongoose.model('Resource');

  return {
    create,
    get
  };

  function create(resource) {
    if (!resource) {
      return Promise.reject(new Error('Resource is required'));
    }

    return new ResourceModel(resource).save();
  }

  function get(id) {
    return ResourceModel.findById(id);
  }
};

module.exports = dependencies => {
  const ResourceModel = require('./db/resource')(dependencies);
  const resource = require('./resource')(dependencies);

  return {
    db: {
      ResourceModel
    },
    resource
  };
};

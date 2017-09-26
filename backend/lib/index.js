module.exports = dependencies => {
  const ResourceModel = require('./db/resource')(dependencies);
  const resource = require('./resource')(dependencies);
  const search = require('./search')(dependencies);

  return {
    db: {
      ResourceModel
    },
    resource,
    search
  };
};

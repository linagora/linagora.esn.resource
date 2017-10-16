module.exports = dependencies => {
  const ResourceModel = require('./db/resource')(dependencies);
  const administrator = require('./administrator')(dependencies);
  const resource = require('./resource')(dependencies);
  const search = require('./search')(dependencies);

  return {
    administrator,
    db: {
      ResourceModel
    },
    resource,
    search
  };
};

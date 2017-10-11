const SUPPORTED_TYPES = ['user'];

module.exports = dependencies => {
  // this should be a tuple resolver...
  const tupleResolver = dependencies('collaboration').memberResolver;

  return {
    validateTuple
  };

  // for now support only users, we will add resolvers next
  function validateTuple(tuple) {
    if (!tuple || !tuple.id || !tuple.objectType) {
      return Promise.reject(new Error('Tuple must be defined with id and objectType'));
    }

    if (SUPPORTED_TYPES.indexOf(tuple.objectType) < 0) {
      return Promise.reject(new Error(`${tuple.objectType} is not a supported administrator type`));
    }

    return tupleResolver.resolve(tuple).then(resolved => {
      if (!resolved) {
        throw new Error(`${tuple} has not been found`);
      }

      return resolved;
    });
  }
};

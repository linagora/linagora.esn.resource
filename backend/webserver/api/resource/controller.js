module.exports = () => {
  return {
    create,
    get,
    list,
    update,
    remove
  };

  function create(req, res) {
    res.status(201).json({});
  }

  function get(req, res) {
    res.status(200).json(req.resource);
  }

  function list(req, res) {
    res.status(200).json([]);
  }

  function update(req, res) {
    res.status(200).json({});
  }

  function remove(req, res) {
    res.send(204);
  }
};

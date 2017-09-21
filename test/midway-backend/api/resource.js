const request = require('supertest');
const { ObjectId } = require('bson');

describe('The resource API', function() {
  let user;
  const password = 'secret';
  const moduleName = 'linagora.esn.resource';

  beforeEach(function(done) {
    const self = this;

    this.helpers.modules.initMidway(moduleName, function(err) {
      if (err) {
        return done(err);
      }

      self.helpers.api.applyDomainDeployment('linagora_IT', function(err, models) {
        if (err) {
          return done(err);
        }
        user = models.users[0];
        self.models = models;
        done();
      });
    });
  });

  beforeEach(function() {
    var expressApp = require('../../../backend/webserver/application')(this.helpers.modules.current.deps);

    expressApp.use('/api', this.helpers.modules.current.lib.api);
    this.app = this.helpers.modules.getWebServer(expressApp);
  });

  afterEach(function(done) {
    this.helpers.api.cleanDomainDeployment(this.models, done);
  });

  describe('GET /:id', function() {
    it('should 401 if not logged in', function(done) {
      this.helpers.api.requireLogin(this.app, 'get', '/api/resources/123', done);
    });

    it('should 404 when resource does not exists', function(done) {
      const id = new ObjectId();
      const self = this;

      this.helpers.api.loginAsUser(this.app, user.emails[0], password, (err, requestAsMember) => {
        if (err) {
          return done(err);
        }
        const req = requestAsMember(request(self.app).post(`/api/resources/${id}`));

        req.expect(404, done);
      });
    });

    it('should 200 with the resource', function() {
    });
  });

  describe('DEL /:id', function() {
    it('should 401 if not logged in', function(done) {
      this.helpers.api.requireLogin(this.app, 'delete', '/api/resources/123', done);
    });

    it('should 404 when resource does not exists', function() {
    });

    it('should 204', function() {
    });
  });

  describe('POST /', function() {
    it('should 404 when resource does not exists', function() {
    });

    it('should create the resource and send it back', function() {
    });
  });

  describe('PUT /:id', function() {
    it('should 404 when resource does not exists', function() {
    });

    it('should update the resource and send the updated one', function() {
    });
  });
});

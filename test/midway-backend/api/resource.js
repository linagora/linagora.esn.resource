const request = require('supertest');
const { expect } = require('chai');
const { ObjectId } = require('bson');
const RESOURCE = require('../../../backend/lib/constants').RESOURCE;
const sinon = require('sinon');

describe('The resource API', function() {
  let user, resource, domain;
  let pubsubLocal, publishSpy;
  const password = 'secret';
  const moduleName = 'linagora.esn.resource';

  beforeEach(function(done) {
    const self = this;

    resource = {
      name: 'Office 34',
      description: 'At the left then at the right then at the left',
      type: 'calendar-resource'
    };

    this.helpers.modules.initMidway(moduleName, function(err) {
      if (err) {
        return done(err);
      }

      self.helpers.api.applyDomainDeployment('linagora_IT', function(err, models) {
        if (err) {
          return done(err);
        }
        user = models.users[0];
        domain = models.domain;
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

  beforeEach(function() {
    pubsubLocal = pubsubLocal || this.helpers.requireBackend('core').pubsub.local;
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
        const req = requestAsMember(request(self.app).get(`/api/resources/${id}`));

        req.expect(404, done);
      });
    });

    it('should 200 with the resource', function(done) {
      const self = this;

      resource.creator = user._id;
      resource.domain = domain._id;

      this.helpers.modules.current.lib.lib.resource.create(resource)
      .then(test)
      .catch(done);

      function test(resourceToGet) {
        self.helpers.api.loginAsUser(self.app, user.emails[0], password, (err, requestAsMember) => {
          if (err) {
            return done(err);
          }
          const req = requestAsMember(request(self.app).get(`/api/resources/${resourceToGet._id}`));

          req.expect(200);
          req.end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.body).to.shallowDeepEqual({
              _id: resourceToGet.id,
              creator: user.id,
              name: resource.name,
              domain: {_id: domain._id.toString()},
              description: resource.description,
              type: resource.type
            });

            done();
          });
        });
      }
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
    it('should 401 if not logged in', function(done) {
      this.helpers.api.requireLogin(this.app, 'post', '/api/resources', done);
    });

    it('should create the resource, publish it locally on topic \'resource:created\' and send it back', function(done) {
      const self = this;

      publishSpy = sinon.spy();
      pubsubLocal.topic(RESOURCE.CREATED).publish = publishSpy;

      self.helpers.api.loginAsUser(self.app, user.emails[0], password, (err, requestAsMember) => {
        if (err) {
          return done(err);
        }

        requestAsMember(request(self.app)
          .post('/api/resources'))
          .send(resource)
          .expect(201)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(publishSpy).to.have.been.calledWith(sinon.match({
              _id: sinon.match.any,
              creator: sinon.match.any,
              domain: sinon.match.any,
              name: resource.name,
              description: resource.description,
              type: resource.type,
              timestamps: {creation: sinon.match.any}
            }));

            expect(res.body).to.shallowDeepEqual({
              name: resource.name,
              description: resource.description,
              type: resource.type
            });
            done();
          });
      });
    });
  });

  describe('PUT /:id', function() {
    it('should 404 when resource does not exists', function() {
    });

    it('should update the resource and send the updated one', function() {
    });
  });
});

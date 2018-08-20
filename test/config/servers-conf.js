'use strict';

const DEFAULT_PORTS = {
  express: 23455,
  mongo: 23456
};
const tmp = 'tmp';
const host = process.env.HOSTNAME || process.env.DOCKER_HOST || 'localhost';
const dbName = 'tests';
const mongoHost = process.env.MONGO_HOST || host;
const mongoPort = process.env.MONGO_PORT || DEFAULT_PORTS.mongo;
var elasticsearchHost = process.env.ELASTICSEARCH_HOST || process.env.HOSTNAME || process.env.DOCKER_HOST || 'localhost';
var elasticsearchPort = process.env.ELASTICSEARCH_PORT || DEFAULT_PORTS.elasticsearch;

module.exports = {
  tmp,

  default_ports: DEFAULT_PORTS,

  host,

  express: {
    port: process.env.PORT_EXPRESS || DEFAULT_PORTS.express
  },

  mongodb: {
    cmd: process.env.CMD_MONGODB || 'mongod',
    port: mongoPort,
    interval_replica_set: process.env.MONGODB_INTERVAL_REPLICA_SET || 1000,
    tries_replica_set: process.env.MONGODB_TRIES_REPLICA_SET || 20,
    connectionString: 'mongodb://' + mongoHost + ':' + mongoPort + '/' + dbName,
    replicat_set_name: 'rs',
    dbname: dbName,
    dbpath: tmp + '/mongo/',
    logpath: ''
  },

  elasticsearch: {
    port: elasticsearchPort,
    host: elasticsearchHost,
    communication_port: process.env.COMMUNICATION_PORT_ELASTICSEARCH || DEFAULT_PORTS.elasticsearch_comm,
    interval_index: process.env.ELASTICSEARCH_INTERVAL_INDEX || 1000,
    tries_index: process.env.ELASTICSEARCH_TRIES_INDEX || 20,
    cluster_name: 'elasticsearch'
  }
};

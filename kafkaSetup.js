'use strict';

const util = require('util');
const config = require('./configuration');
const values = config.values;

const kafkaConnectionString = util.format('%s:%s', values.kafkaServerName, values.kafkaPort);

const kafka = require('kafka-node');
const Client = kafka.Client;
var client = new Client(kafkaConnectionString, 'kafkaSetup');

const HighLevelProducer = kafka.HighLevelProducer;
var producer = new HighLevelProducer(client);

const logger = config.logger;

logger.info('kafkaSetup.client connecting to %s', kafkaConnectionString);

client.on('error', function (err) {
  logger.error('kafkaSetup.client', {error: err});
});

producer.on('error', function (err) {
  logger.error('kafkaSetup.producer', {error: err})
});

function setup (callback) {
  producer.on('ready', function () {
    logger.info('kafkaSetup.producer is ready');
    let topics = [
      values.topics.company
    ];
    producer.createTopics(topics, true, function (err, data) {
      logger.info('kafkaSetup.producer.createTopics executed', {topics: topics}, {error: err}, {data: data});
      callback();
    });
  });
}

exports.setup = setup

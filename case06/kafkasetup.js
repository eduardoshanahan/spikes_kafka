'use strict';

const kafka = require('kafka-node');
const Client = kafka.Client;
const client = new Client('SpikesKafkaCase06Kafka:2181', 'kafkaSetup');
const HighLevelProducer = kafka.HighLevelProducer;
const producer = new HighLevelProducer(client);

client.on('error', function (err) {
  let log = {
    message: 'the client for kafkaSetup had an error',
    date: new Date(),
    error: err
  }
  console.log(log);
});

producer.on('error', function (err) {
  let log = {
    message: 'the producer for kafkaSetup had an error',
    date: new Date(),
    error: err
  }
  console.log(log);
});

function setup (callback) {
  producer.on('ready', function () {
    let log = {
      message: 'the producer for kafkaSetup is ready',
      date: new Date()
    }
    console.log(log);
    producer.createTopics(['test'], true, function (err, data) {
      let log = {
        message: 'the producer for kafkaSetup created a topic with the results',
        date: new Date(),
        error: err,
        data: data
      }
      console.log(log);
      callback();
    });
  });
}

module.exports.setup = setup

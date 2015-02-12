'use strict';

const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.Client('SpikesKafkaCase06Kafka:2181', 'kafkaSetup');
const producer = new Producer(client);

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

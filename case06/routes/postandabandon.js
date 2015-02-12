'use strict';

const restify = require('restify');
const util = require('util');
const uuid = require('node-uuid');
const kafka = require('kafka-node');
const Client = kafka.Client;
const client = new Client('SpikesKafkaCase06Kafka:2181', 'producer');
const Producer = kafka.Producer;
const producer = new Producer(client);

client.on('error', function (err) {
  let log = {
    message: 'the client for postAndAbandon had an error',
    date: new Date(),
    content: err
  }
  console.log(log);
});

producer.on('error', function (err) {
  let log = {
    message: 'the producer for postAndAbandon had an error',
    date: new Date(),
    content: err
  }
  console.log(log);
});

function post (req, res, next) {
  let log = {
    message: 'call received in post for postandAbandon',
    date: new Date()
  }
  console.log(log);

  let message = {
    content: 'node message for postAndAbandon',
    id: uuid.v4(),
    date: new Date()
  };

  let payloads = [
        {
          topic: 'test',
          messages: [message],
        }
    ];

  producer.send(payloads, function (err, data) {
    let log = {
      message: 'the producer for postAndAbandon sent a payload',
      date: new Date(),
      error: err,
      data: data
    }
    console.log(log);

    res.contentType = 'json';
    res.send(log);
    return next();
  });
};

module.exports.post = post;

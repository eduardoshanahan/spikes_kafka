'use strict';

const restify = require('restify');
const util = require('util');
const kafka = require('kafka-node');
const Client = kafka.Client;
const client = new Client('SpikesKafkaCase06Kafka:2181', 'getWithKafka');
const HighLevelConsumer = kafka.HighLevelConsumer;
const consumer = new HighLevelConsumer(
    client,
    [
      { topic: 'test', partition: 0 }
    ],
    {
      autoCommit: false
    }
  );

consumer.on('message', function (message) {
  let log = {
    message: 'the consumer for getWithKafka received a message',
    date: new Date(),
    content: message
  }
  console.log(log);
});

consumer.on('error', function(err){
  let log = {
    message: 'the consumer for getWithKafka had an error',
    date: new Date(),
    content: err
  }
  console.log(log);
});


function get (req, res, next) {
  let log = {
    message: 'call received for get in getWithKafka',
    date: new Date(),
    id: req.params.id
  }
  console.log(log);

  res.contentType = 'json';
  res.send(log);
  return next();
};

module.exports.get = get;

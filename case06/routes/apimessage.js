'use strict';

const restify = require('restify');
const util = require('util');

const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.Client('SpikesKafkaCase06Kafka:2181', 'producer');
const producer = new Producer(client);

// let payloads = [
//       { topic: 'test', messages: ['node message '+ new Date()] }
//   ];
//
// producer.on('ready', function () {
//   console.log('ready to send message');
//   producer.createTopics(['test'], true, function (err, data) {
//     console.log('error received is', err);
//     console.log('data received is', data);
//     producer.send(payloads, function (err, data) {
//       console.log('message sent');
//       console.log(err, data);
//     });
//   });
// });

client.on('error', function (err) {
  console.log('the client had an error', err);
});

producer.on('error', function (err) {
  console.log('the producer had an error', err);
});

let clientConsumer = new kafka.Client('SpikesKafkaCase06Kafka:2181', 'case06');
let Consumer = kafka.Consumer;
let consumer = new Consumer(
    clientConsumer,
    [
      { topic: 'test', partition: 0 }
    ],
    {
      autoCommit: false
    }
  );

consumer.on('message', function (message) {
  console.log('message received by client');
    console.log(message);
});

consumer.on('error', function(err){
  console.log('the consumer had an error', err);
});


function getNoMessage (req, res, next) {
  console.log('get received for getNoMessage', new Date());
  res.contentType = 'json';
  res.send({ content: 'this is a message for getNoMessage' });
  return next();
};

module.exports.getNoMessage = getNoMessage;

function getNotWaited (req, res, next) {
  console.log('get received for getNotWaited', new Date());

  res.contentType = 'json';
  res.send({ content: 'this is a message for getNotWaited' });
  return next();
};

module.exports.getNotWaited = getNotWaited;

function postSendNotWaited (req, res, next) {
  console.log('post received for postSendNotWaited', new Date());

  let payloads = [
        { topic: 'test', messages: ['node message '+ new Date()] }
    ];
  // producer.on('ready', function () {
    // console.log('ready to send message');
    // producer.createTopics(['test'], true, function (err, data) {
      // console.log('error received is', err);
      // console.log('data received is', data);
      producer.send(payloads, function (err, data) {
        console.log('message sent');
        console.log(err, data);

        res.contentType = 'json';
        res.send({ content: 'this is a message for postSendNotWaited' });
        return next();
      });
    // });
  // });

};

module.exports.postSendNotWaited = postSendNotWaited;

function postSendAndWait (req, res, next) {
  console.log('post received for postSendAndWait', new Date());
  res.contentType = 'json';
  res.send({ content: 'this is a message for postSendAndWait' });
  return next();
};

module.exports.postSendAndWait = postSendAndWait;

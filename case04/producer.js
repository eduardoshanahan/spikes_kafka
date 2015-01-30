// 'use strict';

var kafka = require('kafka-node');
var  Producer = kafka.Producer;
// var  client = new kafka.Client('localhost:2181');
// var  client = new kafka.Client('SpikesKafkaCase04Kafka:2181', 'cocoliso');
var  client = new kafka.Client('192.168.86.10:2181', 'cocoliso');
var  producer = new Producer(client);
var  payloads = [
      { topic: 'test', messages: ['node message '+ new Date()] }
  ];

producer.on('ready', function () {
  console.log('ready to send message');
  producer.createTopics(['test'], true, function (err, data) {
    console.log('error received is', err);
    console.log('data received is', data);
    producer.send(payloads, function (err, data) {
      console.log('message sent');
      console.log(err, data);
    });
  });

});

client.on('error', function (err) {
  console.log('the client had an error', err);
});

producer.on('error', function (err) {
  console.log('the producer had an error', err);
});

console.log('ready');
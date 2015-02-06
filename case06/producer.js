'use strict';

const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.Client('SpikesKafkaCase05Kafka:2181', 'producer');
const producer = new Producer(client);

let payloads = [
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
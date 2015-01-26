'use strict';

var kafka = require('kafka-node'),
  client = new kafka.Client('192.168.86.5:2181', 'case04'),
  Producer = kafka.Producer,
  producer = new Producer(client),
  payloads = [
      { topic: 'test', messages: ['node message '+ new Date()] }
  ];

producer.on('ready', function () {
  console.log('ready to send message');
    producer.send(payloads, function (err, data) {
      console.log('message sent');
        console.log(data);
    });
});

producer.on('error', function (err) {
  console.log('the producer had an error', err);
})

'use strict';

var kafka = require('kafka-node'),
  client = new kafka.Client('localhost:2181', 'case01'),
  Producer = kafka.Producer,
  producer = new Producer(client),
  Consumer = kafka.Consumer,
  consumer = new Consumer(
    client,
    [
      { topic: 'test', partition: 0 }
    ],
    {
      autoCommit: false
    }
  ),
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

consumer.on('message', function (message) {
  console.log('message received');
    console.log(message);
});

consumer.on('error', function(message){
  console.log('the consumer had an error', err);
})
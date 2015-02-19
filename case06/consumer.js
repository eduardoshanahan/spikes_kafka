'use strict';

var kafka = require('kafka-node'),
  client = new kafka.Client('SpikesKafkaCase05Kafka:2181', 'case05'),
  Consumer = kafka.Consumer,
  consumer = new Consumer(
    client,
    [
      { topic: 'test' }
    ],
    {
      autoCommit: false
    }
  );

consumer.on('message', function (message) {
  console.log('message received');
    console.log(message);
});

consumer.on('error', function(err){
  console.log('the consumer had an error', err);
});

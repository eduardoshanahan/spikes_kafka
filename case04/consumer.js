'use strict';

var kafka = require('kafka-node'),
  client = new kafka.Client('192.168.86.5:2181', 'case04'),
  Consumer = kafka.Consumer,
  consumer = new Consumer(
    client,
    [
      { topic: 'test', partition: 0 }
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
'use strict';

var kafka = require('kafka-node'),
  client = new kafka.Client('localhost:2181', 'case02'),
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

producer.createTopics(['t2','t3'], false, function (err, data) {
    console.log('sync topic ', err, data);
});
// Create topics async
producer.createTopics(['t4'], true, function (err, data) {
  console.log('async topic ', data);
});
producer.createTopics(['t5'], function (err, data) {
  console.log('async topic no second argument', data);  
});// Simply omit 2nd arg

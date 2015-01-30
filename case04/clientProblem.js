var kafka = require('kafka-node');
// var  client = new kafka.Client('localhost:2181');
// var  client = new kafka.Client('SpikesKafkaCase04Kafka:2181', 'testclient');
var  client = new kafka.Client('192.168.86.10:2181', 'testclient');

client.on('error', function (err) {
  console.log('the client had an error', err);
});

client.on('ready', function() {
  console.log('ready');
});

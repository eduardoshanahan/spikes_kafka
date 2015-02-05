var kafka = require('kafka-node');
var  client = new kafka.Client('SpikesKafkaCase05Kafka:2181', 'clientproblem');

client.on('error', function (err) {
  console.log('the client had an error', err);
});

client.on('ready', function() {
  console.log('ready');
});

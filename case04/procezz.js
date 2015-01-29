var Producer = require('Prozess').Producer;

var producer = new Producer('test', {host : '192.168.86.10:2181'});
producer.connect();
console.log("producing for ", producer.topic);
producer.on('error', function(err){
  console.log("some general error occurred: ", err);  
});
producer.on('brokerReconnectError', function(err){
  console.log("could not reconnect: ", err);  
  console.log("will retry on next send()");  
});
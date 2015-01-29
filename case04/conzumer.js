var Consumer = require('Prozess').Consumer;

var options = {host : 'localhost:2181', topic : 'test', partition : 0, offset : 0};
var consumer = new Consumer(options);
consumer.connect(function(err){
  if (err) {  throw err; }
  console.log("connected!!");
  setInterval(function(){
    console.log("===================================================================");
    console.log(new Date());
    console.log("consuming: " + consumer.topic);
    consumer.consume(function(err, messages){
      console.log(err, messages);
    });
  }, 7000);
});
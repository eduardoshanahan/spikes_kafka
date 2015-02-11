'use strict';

const configuration = require('./configuration').configuration;
const restify = require('restify');
const apimessage = require('./routes/apimessage');

const server = restify.createServer(
  {
    name : configuration.serverName
  }
);

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.fullResponse());

server.get('/getnomessage', apimessage.getNoMessage);
// curl -isS http://192.168.6.21:3000/getnomessage

server.get('/getnotwaited', apimessage.getNotWaited);
// curl -isS http://192.168.6.21:3000/getnotwaited

server.post('/sendnotwaited', apimessage.postSendNotWaited);
// curl -X POST -isS -H "Content-Type:application/json" http://192.168.6.21:3000/sendnotwaited

server.post('/sendandwait', apimessage.postSendAndWait);
// curl -X POST -isS -H "Content-Type:application/json" http://192.168.6.21:3000/sendandwait

function start(portNumber) {
  server.listen(
    portNumber,
    configuration.hostname,
    function onListening() {
      console.log('Server %s listening at %s', server.name, server.url);
    })
};

//PORT=3000 nodemon server.js &
start(process.env.PORT || configuration.apiPort);

'use strict';

const configuration = require('./configuration').configuration;
const restify = require('restify');
const util = require('util');
const apimessage = require('./routes/apimessage');

const server = restify.createServer(
  {
    name : configuration.serverName
  }
);

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.fullResponse());

server.get('/first', apimessage.getFirst);
// curl -isS http://localhost:3000/first

server.get('/second', apimessage.getSecond);
// curl -isS http://localhost:3000/second

server.post('/first', apimessage.postFirst);
// curl -X POST -isS -H "Content-Type:application/json" http://localhost:3000/first

server.post('/second', apimessage.postSecond);
// curl -X POST -isS -H "Content-Type:application/json" http://localhost:3000/second

function start(portNumber) {
  server.listen(
    portNumber,
    configuration.hostname,
    function onListening() {
      console.log('Server %s listening at port %s', configuration.serverName, portNumber);
    })
};

//PORT=3000 nodemon server.js &
start(process.env.PORT || configuration.apiPort);

'use strict';

const configuration = require('./configuration').configuration;
const restify = require('restify');
const getNoKafka = require('./routes/getnokafka');
const getWithKafka = require('./routes/getwithkafka');
const postAndWaitForKafka = require('./routes/postandwaitforkafka');
const postAndAbandon = require('./routes/postandabandon');

const server = restify.createServer(
  {
    name : configuration.serverName
  }
);

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.fullResponse());

server.get('/getnokafka', getNoKafka.get);
// curl -isS http://192.168.6.21:3000/getnokafka

server.get('/getwithkafka', getWithKafka.get);
// curl -isS http://192.168.6.21:3000/getwithkafka

server.post('/postandwaitforkafka', postAndWaitForKafka.post);
// curl -X POST -isS -H "Content-Type:application/json" http://192.168.6.21:3000/postandwaitforkafka

server.post('/postandabandon', postAndAbandon.post);
// curl -X POST -isS -H "Content-Type:application/json" http://192.168.6.21:3000/postandabandon

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

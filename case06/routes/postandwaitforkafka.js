'use strict';

const restify = require('restify');
const util = require('util');

function post (req, res, next) {
  console.log('post received for postAndWaitForKafka', new Date());

  let payloads = [
        { topic: 'test', messages: ['node message '+ new Date()] }
    ];

  producer.send(payloads, function (err, data) {
    console.log('message sent', err, data);

    res.contentType = 'json';
    res.send({ content: 'this is a message for postAndWaitForKafka', date: new Date() });
    return next();
  });

};

module.exports.post = post;

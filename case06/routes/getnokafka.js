'use strict';

const restify = require('restify');
const util = require('util');

function get (req, res, next) {
  let log = {
    message: 'call received for get in getNoKafka',
    date: new Date()
  }
  console.log(log);
  
  res.contentType = 'json';
  res.send(log);
  return next();
};

module.exports.get = get;

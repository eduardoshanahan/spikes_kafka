'use strict';

const restify = require('restify');
const util = require('util');

function getFirst (req, res, next) {
  console.log('get received for first', new Date());
  res.contentType = 'json';
  res.send({ content: 'this is a message for get first' });
  return next();
};

module.exports.getFirst = getFirst;

function getSecond (req, res, next) {
  console.log('get received for second', new Date());
  res.contentType = 'json';
  res.send({ content: 'this is a message for get second' });
  return next();
};

module.exports.getSecond = getSecond;


function postFirst (req, res, next) {
  console.log('post received for first');
  res.contentType = 'json';
  res.send({ content: 'this is a message for post first' });
  return next();
};

module.exports.postFirst = postFirst;

function postSecond (req, res, next) {
  console.log('post received for first');
  res.contentType = 'json';
  res.send({ content: 'this is a message for post second' });
  return next();
};

module.exports.postSecond = postSecond;

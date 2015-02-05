'use strict';

const util = require('util');

const values = new function() {
  this.apiPort = 3000,
  this.hostname = 'localhost',
  this.name = 'PublicAPI',
  this.serverName = util.format('%s%s', this.name, this.apiPort)
}

module.exports.configuration = values;


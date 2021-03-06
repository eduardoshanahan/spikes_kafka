'use strict';

const util = require('util');

const values = new function() {
  this.apiPort = 3004,
  this.hostname = 'ServerKafkaCase05Servers',
  this.name = 'PublicAPI',
  this.serverName = util.format('%s%s', this.name, this.apiPort)
}

module.exports.configuration = values;


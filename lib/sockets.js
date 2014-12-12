'use strict'

var Connection  = require('./connection'),
    geoip       = require('geoip-lite');

var MAX_CONNECTIONS = 100;

module.exports = function(clientIO, serverIO) {
  var connections = [];

  clientIO.on('login', function (data) {
    handleConnection('login', data);
  });

  clientIO.on('action', function (data) {
    handleConnection('action', data);
  });

  clientIO.on('logout', function (data) {
    handleConnection('logout', data);
  });

  function handleConnection (name, data) {
    data.name = name;
    var connection = new Connection(data).format();
    if (connections.length >= MAX_CONNECTIONS) {
        connections.splice(0, 1);
    }
    connections.push(connection);
    serverIO.emit('event-stream', connections);
  }
}

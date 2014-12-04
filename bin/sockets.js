'use strict'

var Connection  = require('./connection'),
    geoip       = require('geoip-lite');

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
    connections.push(connection);
    serverIO.emit('event-stream', connections);
  }
}

'use strict';

var express = require('express'),
    http    = require('http'),
    path    = require('path');

var app = express();

var logger = require('morgan');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'www')));

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname,'www/views/index.html'));
});

if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});

var serverIO = require('socket.io')(server);
var clientIO = require('socket.io-client')('http://198.100.149.7:10000');

var sockets = require('./bin/sockets')(clientIO, serverIO);

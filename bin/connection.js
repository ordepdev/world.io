'use strict';

var geoip = require('geoip-lite');

var EVENTS = {
  login:  'login',
  action: 'action',
  logout: 'logout'
}
var DEFAULTS = {
  radius:         2,
  loginFillKey:   EVENTS.login,
  actionFillKey:  EVENTS.action,
  logoutFillKey:  EVENTS.logout,
  borderWidth:    0
}

var Connection = function (options) {
  this.name = options.name,
  this.ip = options.ip,
  this.type = options.type,
  this.getGeoLocation(),
  this.getFillKey()
}

Connection.prototype.getFillKey = function () {
  if (this.name === EVENTS.login) {
    this.fillKey = DEFAULTS.loginFillKey;
  }
  else if (this.name === EVENTS.action) {
    this.fillKey = DEFAULTS.actionFillKey;
  } else {
    this.fillKey = DEFAULTS.logoutFillKey;
  }
}

Connection.prototype.getGeoLocation = function () {
  var geo         = geoip.lookup(this.ip);
  this.latitude   = geo.ll[0];
  this.longitude  = geo.ll[1];
  this.city       = geo.city;
  this.country    = geo.country;
}

Connection.prototype.format = function () {
  var connection = {
    name:        this.name,
    ip:          this.ip,
    latitude:    this.latitude,
    longitude:   this.longitude,
    city:        this.city,
    country:     this.country,
    fillKey:     this.fillKey,
    radius:      DEFAULTS.radius,
    borderWidth: DEFAULTS.borderWidth,
    where:       !this.city ? this.country : this.city + ', ' + this.country
  };

  return connection;
}

module.exports = Connection;
/**
 * Module dependencies.
 */
var util = require('util')
var passport = require('passport-strategy')
var POP3Client = require('poplib')
var lookup = require('./utils').lookup

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy (options, verify) {
  options = options || {}

  switch (typeof options.host) {
    case 'string': break
    case 'undefined': throw new Error('options.host is required')
    default: throw new TypeError('Expected options.host to be string')
  }

  switch (typeof options.port) {
    case 'number': break
    case 'undefined': throw new Error('options.port is required')
    default: throw new TypeError('Expected options.port to be number')
  }

  passport.Strategy.call(this, options, verify)
  this.name = 'pop3'
  this._usernameField = options.usernameField || 'username'
  this._passwordField = options.passwordField || 'password'
  this._port = options.port
  this._host = options.host
  this._tlserrs = options.tlserrs
  this._enabletls = options.enabletls
  this._debug = options.debug
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy)

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function (req, options) {
  options = options || {}
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField)
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField)

  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400)
  }

  var self = this

  this._client = new POP3Client(this._port, this._host, {
    tlserrs: this._tlserrs || false,
    enabletls: this._enabletls || true,
    debug: this._debug || false
  })

  this._client.on('error', function (err) {
    self.error(err)
  })

  this._client.on('connect', function () {
    self._client.login(username, password)
  })

  this._client.on('login', function (status, rawdata) {
    if (status) {
      self._client.quit()
      self.success({ [self._usernameField]: username }, { message: 'LOGIN/PASS success' })
    } else {
      self._client.quit()
      self.fail({ message: 'LOGIN/PASS failed' })
    }
  })
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy

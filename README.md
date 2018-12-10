# passport-pop3

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]

> POP3 authentication strategy for [Passport](http://passportjs.org/)

This module lets you authenticate using POP3 authentication in your Node.js applications.
By plugging into Passport, POP3 authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

```
$ npm install --save passport-pop3
```

## Usage

### Configure Strategy

The POP3 authentication strategy authenticates users using a username and password, and you must provide `host` and `port` for POP3 authentication.

```js
passport.use(new POP3Strategy({
    host: 'localhost',
    port: 995
  }
));
```

##### Available Options

The available options are:

* `enabletls` - Optional, defaults to true. If `enabletls` is true, the library will use a TLS connection. Note that you will have to set the correct port (generally 995).
* `tlserrs` - Optional, defaults to false. If `tlserrs` is true, then TLS errors will be ignored.
* `debug` - Optional, defaults to false. If `debug` is true, prints out requests and responses.
* `usernameField` - Optional, defaults to 'username'.
* `passwordField` - Optional, defaults to 'password'.

The fields `usernameField` and `passwordField` define the name of the properties in the POST body that are sent to the server.

#### Parameters

By default, `POP3Strategy` expects to find credentials in parameters
named username and password. If your site prefers to name these fields
differently, options are available to change the defaults.

```js
passport.use(new POP3Strategy({
    host: 'localhost',
    port: 110,
    enabletls: false,
    usernameField: 'email',
    passwordField: 'passwd',
  }
));
```

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'pop3'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
app.post('/login',
  passport.authenticate('pop3', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
```

## License

MIT © [Chun-Kai Wang](https://github.com/chunkai1312)

[npm-image]: https://img.shields.io/npm/v/passport-pop3.svg
[npm-url]: https://npmjs.org/package/passport-pop3
[travis-image]: https://img.shields.io/travis/chunkai1312/passport-pop3.svg
[travis-url]: https://travis-ci.org/chunkai1312/passport-pop3
[codecov-image]: https://img.shields.io/codecov/c/github/chunkai1312/passport-pop3.svg
[codecov-url]: https://codecov.io/gh/chunkai1312/passport-pop3

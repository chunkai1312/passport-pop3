/* eslint no-unused-vars: 0, no-unused-expressions: 0 */

var chai = require('chai')
var POP3Strategy = require('../lib/strategy')

describe('Strategy', function () {
  describe('constructed', function () {
    var strategy = new POP3Strategy({
      host: 'localhost',
      port: 995
    }, function () { })

    it('should be named pop3', function () {
      expect(strategy.name).to.equal('pop3')
    })
  })

  describe('constructed with invalid options', function () {
    it('should throw error if options.host is missing', function () {
      expect(function () {
        var strategy = new POP3Strategy({}, function () { })
      }).to.throw(Error)
    })

    it('should throw error if options.host not a string', function () {
      expect(function () {
        var strategy = new POP3Strategy({ host: 1234567890 }, function () { })
      }).to.throw(TypeError)
    })

    it('should throw error if options.port is missing', function () {
      expect(function () {
        var strategy = new POP3Strategy({ host: 'localhost' }, function () { })
      }).to.throw(Error)
    })

    it('should throw error if options.port not a number', function () {
      expect(function () {
        var strategy = new POP3Strategy({ host: 'localhost', port: 'port' }, function () { })
      }).to.throw(TypeError)
    })
  })

  describe('handling a request without a body, but no username and password, with message option to authenticate', function () {
    var strategy = new POP3Strategy({
      host: 'localhost',
      port: 995
    }, function () { })

    var info, status

    before(function (done) {
      chai.passport.use(strategy)
        .fail(function (i, s) {
          info = i
          status = s
          done()
        })
        .req(function (req) {
          req.body = {}
        })
        .authenticate({ badRequestMessage: 'Something is wrong with this request' })
    })

    it('should fail with info and status', function () {
      expect(info).to.be.an.object
      expect(info.message).to.equal('Something is wrong with this request')
      expect(status).to.equal(400)
    })
  })
})

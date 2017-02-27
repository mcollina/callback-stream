/* globals test */
/* eslint-disable handle-callback-err */
'use strict'

const {equal, deepEqual} = require('assert')
var callback = require('./')
var {createReadStream, readFileSync} = require('fs')

test('call the callback after end with object mode', function (done) {
  var opts = { objectMode: true }
  var stream = callback(opts, function (err, results) {
    deepEqual(results, ['hello'], 'should return the ending value')
    done()
  })

  stream.end('hello')
})

test('support multiple writes with object mode', function (done) {
  var opts = { objectMode: true }
  var stream = callback(opts, function (err, results) {
    deepEqual(results, ['hello', 'world'], 'should return the ending value')
    done()
  })

  stream.write('hello')
  stream.end('world')
})

test('works without object mode', function (done) {
  var stream = callback(function (err, results) {
    equal(results.length, 1, 'should contain only one value')
    deepEqual(results[0].toString(), 'world', 'should return the ending value')
    done()
  })

  stream.end('world')
})

test('is pipeable', function (done) {
  var write = callback(function (err, results) {
    var actual = Buffer.concat(results).toString()
    var expected = readFileSync('README.md').toString()
    equal(actual, expected, 'should have the same content of the file')
    done()
  })
  var read = createReadStream('README.md')

  read.pipe(write)
})

test('callback.obj shortcut for objectMode', function (done) {
  var stream = callback.obj(function (err, results) {
    deepEqual(results, ['hello'], 'should return the ending value')
    done()
  })

  stream.end('hello')
})

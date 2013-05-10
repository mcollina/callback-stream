
var Writable = require("stream").Writable
  , extend   = require("xtend")
  , defaults = {
      objectMode: true
    }

if (!Writable) {
  Writable = require("readable-stream").Writable;
}

function CallbackStream(options, callback) {

  if (!(this instanceof CallbackStream)) {
    return new CallbackStream(options, callback)
  }

  if (typeof options === "function") {
    callback = options
    options = {}
  }

  options = extend(defaults, options)

  Writable.call(this, options)

  this.results = []
  this.on("finish", function() {
    callback(null, this.results)
  })

  this.once("pipe", function(source) {
    source.on("error", callback);
  })
}

CallbackStream.prototype = Object.create(
  Writable.prototype,
  { constructor: { value: CallbackStream } }
);

CallbackStream.prototype._write = function(data, encoding, done) {
  this.results.push(data)
  done()
};

module.exports = CallbackStream

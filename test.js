
var test = require("tap").test
  , callback = require("./")

test("call the callback after end", function(t) {
  var stream = callback(function(err, results) {
    t.deepEqual(results, ["hello"], "should return the ending value")
    t.end()
  });

  stream.end("hello")
});

test("support multiple writes", function(t) {
  var stream = callback(function(err, results) {
    t.deepEqual(results, ["hello", "world"], "should return the ending value")
    t.end()
  });

  stream.write("hello")
  stream.end("world")
});

test("work with object mode disabled", function(t) {
  var stream = callback({ objectMode: false }, function(err, results) {
    t.equal(results.length, 1, "should contain only one value")
    t.deepEqual(results[0].toString(), "world", "should return the ending value")
    t.end()
  });

  stream.end("world")
});

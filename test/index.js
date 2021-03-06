//this file will contain the logic to run tests
var Cache = require('./../cache.js');
var assert = require('assert');


//test my cache works

describe('Redis-Proxy', function() {

  it('should test local cache', function() {
    //set up a new cache
    var cache = new Cache();

    cache.put("123456", "carpet", 500);

    var value = cache.get("123456");

    //set up an assert and we should expect carpet
    assert.equal(value, "carpet");
    });

  it('should test global expires', function(done) {
      //set up a new cache
      var cache = new Cache();

      cache.put("123456", "carpet", 50);

      setTimeout(function(){
        var value = cache.get("123456");
        assert.equal(value, null);
        done();
      }, 100)

      });


})

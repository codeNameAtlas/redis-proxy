//this file will contain the logic to create a redis client and access the methods

/*
var RedisClient = function() {
    var self = this;

    return self;
};

*/

//currently not using this file


function RedisClient (redis) {
  this.redis = redis
}

RedisClient.prototype.getValueFromRedis = function (key, cb) {
  this.redis().get(key, function (err, value) {
    cb(err, value)
  })
}

RedisClient.prototype.setValueFromRedis = function (key, cb) {
  this.redis().get(key, function (err, value) {
    cb(err, value)
  })
}

module.exports = RedisClient;

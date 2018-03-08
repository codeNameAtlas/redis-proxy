var app = require('./server/index.js');
var hash = require('./utils.js');
var Cache = require('./memory.js');
var redis = require("redis");
var cache = new Cache();

//command line config options with defaults
//downside is this implementation requires all
//command line arguments to be passed in a specific order

var port = process.argv[2] || 6379;
var host = process.argv[3] || '127.0.0.1';
var cacheSize = process.argv[4] || 5;
var globalExpires = process.argv[5] || 10000;

//single backing instance that can handle options
var client = redis.createClient(port, host);

client.on('connect', function() {
    console.log('connected');
});

//assumning a string is curl requested at this endpoint
//possibly update this to accept url query params
app.get('/:id', function (req, res) {
  //grab the value from the HTTP GET
  var id = req.params.id;
  //create a key with a hash function
  //possible improvement might be to add some logic to handle spaces and characters
  var key = hash(id);
  key = key.toString();
  //prepare it as an array to pass to redis/localCache
  var redisArr = [key, id];
  console.log("hash worked", redisArr);
  console.log("cache size", cache.size());

  /* CACHE SIZE LOGIC */
  //spec says - The cache capacity is configured in terms of number of keys it retains
  //setting the cache size to 5 - size is connected to unique keys in the cache
  if (cache.size() === cacheSize ) {
    //spec is unclear as to the decision to make when limit is reached
    //if LRU eviction was in place we could read the least recently used keys and delete those keys
    //I'm omitting LRU eviction in this take home due to time constraints and just returning an error message
    return res.json("Cache Size Limit Reached");
  }

  /* CACHE SIZE LOGIC ENDS */

  //does the key exisit in the local cache
  if (cache.get(key)) {
    var localKey = cache.get(key);
    //for debugging
    console.log("returning GET from localCache: "  + cache.get(key));

    return res.json(localKey)
  }
  //check to see if the value is in redis
  //set the value in redis to test my logic
  //the spec does not call for this file to set a value in redis
  //to test my logic, i ran this locally and refreshed a few times: http://localhost:3000/hello
  //it worked: https://cl.ly/2f2u2J3k1z0I
  //client.set(redisArr);

  client.get(key, function(err, value){
    if (err) {
      return res.json(err)
    }
    //set the value in the local cache
    cache.put(key, id, globalExpires);
    var localKey = cache.get(key);
    // console.logs for debugging
    // if "value is set in redis the value param returns correctly"
    // i'm slightly confused as to how the value in redis is set originally
    return res.json(localKey);
  })

})

app.listen(3000);
//ensure the app is listening
console.log("on port 3000");

//this must check the local cache - memory.js
   //is it in memory.js?
   //return it
//if not in local cache - memory.js
//check if it exists in redis using redis GET
  //if it is in redis
  //store it in the local cache

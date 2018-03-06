var redis = require("redis");
var express = require('express');
var path = require('path');
var app = express();

var client = redis.createClient();

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
      res.send('nodemon works! hello world')
    })


client.set("string key", "string value", function(err) {
  if (err) {
    throw err;
  }
  client.get("string key", redis.print);
});

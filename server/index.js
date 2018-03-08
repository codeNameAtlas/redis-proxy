//this file will contain the logic to run the server/routes

var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

module.exports = app;

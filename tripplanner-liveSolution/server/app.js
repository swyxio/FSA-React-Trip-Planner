var express = require("express");
var volleyball = require("volleyball");
var bodyParser = require("body-parser");
var path = require("path");

var db = require("./models").db;

var app = express();

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve dynamic routes
app.use("/api", require("./routes"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  console.error(err, err.stack);
  res.status(err.status || 500);
  res.send("error: " + err);
});

// listen on a port
var port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db
    .sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});

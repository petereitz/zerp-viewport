// index.js
// blame preitz@oppor.com

// ---SETUP---
// config
var config = require('./config.js');

// requires
// express bits
var express = require('express');
var app = express();
var server = require('http').Server(app);
server.listen(config.port, function() {
  console.log(config.appName + ' listening on port ' + config.port + "!");
});


// socketio
var io = require("socket.io")(server)


// ---FUNCTIONS---
// util
var getNow = function() {
  return Math.floor(Date.now() / 1000);
};


// -express middleware-
// print the reqeustedd route to console
var printRoute = function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("\n");
  console.log("New request from " + ip + " " + req.method + ":" + req.path);
  //console.log(Object.keys(req));
  next();
};

// dump headers for debugging
var dumpHeaders = function (req, res, next) {
  console.log(req.headers);
  console.log("\n\n");
  console.log(req);
  next();
};



// ---BUSINESS---
// --- middleware ---
app.use(printRoute);
// -static content-
app.use('/', express.static(config.appDir + '/static'));

// inbound events go here
app.post('/event', express.json(), (req, res) => {
  // t
  //console.log(req.body);

  // if it fits, emits
  if(req.body.hasOwnProperty('type') && req.body.hasOwnProperty('message')){
    let payload = {type: req.body.type, message: req.body.message};
    if (req.body.hasOwnProperty('ttl')){
      payload.ttl = req.body.ttl;
    }
    io.emit(req.body.type, payload);
  }

  // things like acknowledgement
  return res.status(200).send()

});


// --- io this and that ---
io.on('connection', function(socket){
  console.log(`${socket.id} connected from ${socket.conn.request.headers['x-forwarded-for']}`);
});

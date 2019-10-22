var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');

//app.use(express.static(__dirname + '/public'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'github-game/build')));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/github-game/build/index.html')));
app.get("/play", (req, res) => res.sendFile(__dirname + '\\public\\babylon.html'));
app.get("/config", (req, res) => {
  res.send(req.connection.remoteAddress);
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
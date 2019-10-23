var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var axios = require('axios');

require('dotenv').config({ path: './secrets.env'});

var githubOAuth = require('github-oauth')({
  githubClient: process.env.CLIENT_ID,
  githubSecret: process.env.CLIENT_SECRET,
  baseURL: 'http://localhost:' + process.env.port,
  loginURI: '/auth/github',
  callbackURI: '/auth/github/callback'
})

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'github-game/build')));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/github-game/build/index.html')));

app.get("/play", (req, res) => res.sendFile(__dirname + '\\public\\babylon.html'));

app.get("/config", (req, res) => {
  res.send(req.connection.remoteAddress);
});

app.get("/auth/github", function(req, res){
  console.log("started oauth");
  return githubOAuth.login(req, res);
});

app.get("/auth/github/callback", function(req, res){
  console.log("received callback");
  return githubOAuth.callback(req, res);
});


githubOAuth.on('error', function(err) {
  console.error('there was a login error', err)
})

githubOAuth.on('token', function(token, serverResponse) {
  serverResponse.end(JSON.stringify(token))
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
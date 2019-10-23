var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var axios = require('axios');

require('dotenv').config({ path: './secrets.env'});

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'github-game/build')));

app.get("/", (req, res) => res.sendFile(path.join(__dirname + '/github-game/build/index.html')));

app.get("/play", (req, res) => res.sendFile(__dirname + '\\public\\babylon.html'));

app.get("/config", (req, res) => {
  res.send(req.connection.remoteAddress);
});

app.get('/oauth/redirect', (req, res) => {
  // The req.query object has the query params that
  // were sent to this route. We want the `code` param
  const requestToken = req.query.code
  axios({
    // make a POST request
    method: 'post',
    // to the Github authentication API, with the client ID, client secret
    // and request token
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${requestToken}`,
    // Set the content type header, so that we get the response in JSOn
    headers: {
      accept: 'application/json'
    }
  }).then((response) => {
    // Once we get the response, extract the access token from
    // the response body
    const accessToken = response.data.access_token
    // redirect the user to the welcome page, along with the access token
    res.redirect(`/?access_token=${accessToken}`)
  })
})

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
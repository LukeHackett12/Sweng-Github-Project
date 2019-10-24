var express = require("express");
var router = express.Router();

const axios = require('axios');
const Octokit = require("@octokit/rest");

router.get('/token', (req, res) => {
    var url ='https://www.github.com/login/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + req.param("code");

    console.log(url);
    // GET request for remote image
    var request = require('request');
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
            res.send(body);
        }
    })
});

router.get('/repos', (req, res) => {
    const octokit = new Octokit({auth:req.param("access_token")});

    console.log(req.param("access_token"));

    octokit.repos.list()
    .then(({ data }) => {
      console.log(data)
      res.send(data);
    });
});


module.exports = router;

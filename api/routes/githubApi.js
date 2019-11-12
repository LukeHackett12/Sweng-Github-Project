var express = require("express");
var router = express.Router();

const axios = require('axios').create({ withCredentials: true });

router.get('/token', (req, res) => {
    var url ='https://www.github.com/login/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + req.param("code");

    console.log(url);
    var request = require('request');
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.send(body);
        }
    })
});

router.get('/profileUpsert', async (req, res) => {
    var cookies = req.cookies;

    let user;
    await axios.get("https://api.github.com/user?access_token=" + cookies.access_token)
    .then(({ data }) => {
        user=data;
    });

    let repos;
    await axios.get("https://api.github.com/user/repos?access_token=" + cookies.access_token)
    .then(({ data }) => {
        repos=data;
    });

    let events;
    await axios.get("https://api.github.com/events?access_token=" + cookies.access_token)
    .then(({ data }) => {
        events=data;
    });

    let starred;
    await axios.get("https://api.github.com/user/starred?access_token=" + cookies.access_token)
    .then(({ data }) => {
        starred=data;
    });

    let followers;
    await axios.get("https://api.github.com/user/followers?access_token=" + cookies.access_token)
    .then(({ data }) => {
        followers=data;
    });

    let following;
    await axios.get("https://api.github.com/user/following?access_token=" + cookies.access_token)
    .then(({ data }) => {
        following=data;
    });

    var info = 
    {avatar_url : user.avatar_url,
    profile_url : user.html_url,
    name : user.login,
    repos : repos,
    events : events,
    starred : starred,
    followers : followers,
    following : following}; 

    res.send(info);
});

module.exports = router;

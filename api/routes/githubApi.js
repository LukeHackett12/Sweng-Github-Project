var express = require("express");
var router = express.Router();

const axios = require('axios');

router.get('/token', (req, res) => {
    var url ='https://www.github.com/login/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + req.param("code");

    console.log(url);

    var request = require('request');
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body);
        }
    })
});

router.get('/repos', (req, res) => {
    axios.get("https://api.github.com/user/repos?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        res.send(data);
        console.log("Repo list sent");
    });
});

router.get('/profileUpsert', async (req, res) => {
    let user;
    await axios.get("https://api.github.com/user?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        user=data.id;
    });

    let repos;
    await axios.get("https://api.github.com/user/repos?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        repos=data;
    });

    let events;
    await axios.get("https://api.github.com/events?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        events=data;
    });

    let starred;
    await axios.get("https://api.github.com/user/starred?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        starred=data;
    });

    let followers;
    await axios.get("https://api.github.com/user/followers?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        followers=data;
    });

    let following;
    await axios.get("https://api.github.com/user/following?access_token=" + req.param("access_token"))
    .then(({ data }) => {
        following=data;
    });

    console.log("Got all stats");

    var counts = 
    {github_id : user,
    repos : repos.length, //Attack
    events : events.length, //Agility
    starred : starred.length, //Health
    followers : followers.length, //---¬
    following : following.length}; //-----Armor


/*
 MongoClient.connect(uri, function(err, client) {
            var db = client.db("github-game");
            var cursor = db.collection('users').find({}).toArray(function(err, result) {
                if (err) throw err;
                client.close();
              });
        }); 
*/
/*
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://default:" + process.env.MONGO_PASS + "@github-game-adryd.azure.mongodb.net/github-game?retryWrites=true&w=majority";

    MongoClient.connect(uri, function(err, client) {
        var db = client.db("github-game");

        db.collection('users').updateOne(
            {github_id : counts.github_id},
            {$set:counts},
            {upsert: true, safe: false},
            function(err,data){
                if (err){
                    console.log(err);
                }else{
                    console.log("Update succeded");
                }
                client.close();
            }
        );
    }); 
*/
    res.send(counts);
});

module.exports = router;

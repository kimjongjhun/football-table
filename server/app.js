const express = require('express');
const request = require('request');
const app = express();
var mongoose = require('mongoose');
var cron = require('node-cron');


mongoose.connect('mongodb://footyuser:testpassword@ds121622.mlab.com:21622/footytables?readPreference=primary');

var playerSchema = new mongoose.Schema({
    apiTeamId: Number,
    name: String,
    position: String,
    number: Number,
    dob: String,
    nationality: String,
    updatedAt: {type: Date, default: Date.now},
    createdAt: {type: Date, default: Date.now}
}, {strict: false});
var Player = mongoose.model('Player', playerSchema);

var teamSchema = new mongoose.Schema({
    apiTeamId: Number,
    apiLeagueId: Number,
    name: String,
    shortName: String,
    position: Number,
    wins: Number,
    draws: Number,
    losses: Number,
    points: Number,
    crestUrl: String,
    matches: Array,
    updatedAt: {type: Date},
    updates: {
        players: Date,
        matches: Date
    }
}, {strict: false});
var Team = mongoose.model('Team', teamSchema);

var leagueSchema = new mongoose.Schema({
    apiId: Number,
    updatedAt: Date
}, {strict: false});
var League = mongoose.model('League', leagueSchema);


require('./config/cron')(cron);

app.use(express.static('app'));
app.use("/assets", express.static('assets'));

require('./api/teams/index')(app);

app.get('/', function (req, res) {
    console.log(__dirname + '/../app');
    //app.use();
    res.sendFile("index.html", {root: __dirname + '/../app'});
});

// For the landing page
app.get('/api/teams', function (req, res) {

    var searchObj = {};

    if (req.query.teamId) {
        searchObj.apiTeamId = req.query.teamId
    }

    Team.findOne(searchObj).lean().exec(function(error, obj) {
        if (error) {
            return res.status(500).send('match error');
        }
        res.json(obj);
    });
});

// For past and future match lists
app.get('/api/matches', function (req, res) {
    var searchObj = {};
    if (req.query.teamId) {
        searchObj.apiTeamId = req.query.teamId
    }

    Team.findOne(searchObj).lean().exec(function (error, obj) {
        if (error) {
            return res.status(500).send('match error');
        }

        res.json(obj.matches);
    })
});

// @TODO
// Finish out player lists
app.get('/api/players', function (req, res) {
    var searchObj = {};

    if (req.query.teamId) {
        searchObj.teamId = Number(req.query.teamId);
    }

    Player.find(searchObj).lean().exec(function (error, doc) {
        if (error) {
            return res.status(500).send('player error');
        }

        res.json(doc);
    });
});

// @TODO
// Get this working
app.get('/api/leagues', function (req, res) {
    var searchObj = {};

    if (req.query.leagueId) {
        searchObj.apiId = req.query.leagueId;
    }

    League.findOne(searchObj).lean().exec(function (error, doc) {
        if (error) {
            return res.status(500).send('league error');
        }

        res.json(doc);
    })
});


app.listen(1488, function () {
    console.log('Example app listening on port 3000!')
});

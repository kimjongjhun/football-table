const express = require('express');
const request = require('request');
const app = express();

app.use(express.static('app'));
app.use("/assets", express.static('assets'));

require('./api/teams/index')(app);

app.get('/', function (req, res) {
    res.sendFile("index.html", {root: '/' + "app"});
});

// For the landing page
app.get('/api/teams', function (req, res) {
    return request({
        method: 'GET',
        uri: 'http://api.football-data.org/v1/teams/' + req.query.teamId + '?apiKey=c686861cae884c8596fad08aea92403c',
        headers: {
            'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
        }
    }, function (err, obj) {
        if (err) {
            res.error(err);
        }

        res.json(JSON.parse(obj.body));

    });
});

// For past and future match lists
app.get('/api/matches', function (req, res) {
    return request({
        method: 'GET',
        uri: 'http://api.football-data.org/v1/teams/' + req.query.teamId + '/fixtures?apiKey=c686861cae884c8596fad08aea92403c',

        headers: {
            'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
        }

    }, function (err, obj) {
        if (err) {
            res.error(err);
        }
        res.json(JSON.parse(obj.body));
    });
});

// @TODO
// Finish out player lists
app.get('/api/players', function (req, res) {
    return request({
        method: 'GET',
        uri: '',
        headers: {
            'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
        }
    }, function (err, obj) {
        if (err) {
            res.error(err);
        }
        res.json(JSON.parse(obj.body));
    })
});

app.get('/api/leagues', function (req, res) {
    return request({
        method: 'GET',
        uri: 'http://api.football-data.org/v1/soccerseasons/' + req.query.id + '/leagueTable?apiKey=c686861cae884c8596fad08aea92403c',
        headers: {
            'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
        }
    }, function (err, obj) {
        res.json(JSON.parse(obj.body));
    })
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
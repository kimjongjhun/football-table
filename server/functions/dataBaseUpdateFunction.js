var request = require('request');
var moment = require('moment');
var League = require('mongoose').model('League');
var Team = require('mongoose').model('Team');
var Player = require('mongoose').model('Player');

var serviceObj = {
    getAndUpdateLeagues: getAndUpdateLeagues,
    pullTeamsFromLeagues: pullTeamsFromLeagues,
    getAndUpdateMatches: getAndUpdateMatches,
    getAndUpdatePlayers: getAndUpdatePlayers
};

function NeedUpdates(Collection, updateField, minutes, limit) {
    var lt = moment().add('minutes', minutes);

    var search1 = {};
    search1[updateField] = { $lt: lt };
    var search2 = {};
    search2[updateField] = { $exists: false};

    var searchObj = {
        '$or': [
            search1,
            search2
        ]
    };

    return Collection.find(searchObj).limit(limit || 0).lean().exec(function (err, obj) {
        if (err) console.log(err);
        return obj;
    });
}

function getAndUpdateLeagues() {
    NeedUpdates(League, 'updatedAt', -30).then(function (leagues) {
        if (leagues.length < 1) {
            console.log('no outdated leagues found');
            return;
        }
        console.log('outdated leagues found updating them', leagues.length);
        leagues.forEach(function (element) {
            return request({
                method: 'GET',
                uri: 'http://api.football-data.org/v1/soccerseasons/' + element.apiId + '/leagueTable?apiKey=c686861cae884c8596fad08aea92403c',
                headers: {
                    'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
                }
            }, function (err, obj) {
                var leagueObj = JSON.parse(obj.body);
                leagueObj.updatedAt = new Date();
                League.findOneAndUpdate({apiId: element.apiId}, leagueObj, {upsert: true}, function (err, obj) {
                    if (err) console.log(err);
                });
            })
        });
    });
}

function getAndUpdateMatches() {
    NeedUpdates(Team, 'updates.matches', -30, 10).then(function (teams) {
        if (teams.length < 1) {
            console.log('no outdated teams found');
            return;
        }

        teams.forEach(function (team) {
            return request({
                method: 'GET',
                uri: 'http://api.football-data.org/v1/teams/' + team.apiTeamId + '/fixtures?apiKey=c686861cae884c8596fad08aea92403c',
                headers: {
                    'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
                }
            }, function (err, obj) {
                var teamObj = JSON.parse(obj.body);
                var updateObj = {};
                console.log('updating team ', team.apiTeamId);
                updateObj.updatedAt = new Date();
                updateObj.updates = team.updates || {};
                updateObj.updates.matches = new Date();
                updateObj.matches = teamObj.fixtures;
                //don't update teams that don't exist
                if (team.apiTeamId) {
                    Team.findOneAndUpdate({apiTeamId: team.apiTeamId}, updateObj, {upsert: true}, function (err, obj) {
                        if (err) console.log(err);
                    });
                }
            })
        });
    });
}

function getAndUpdatePlayers() {
    NeedUpdates(Team, 'updates.players', -1440, 7).then(function (teams) {
        if (teams.length < 1) {
            console.log('no outdated players found');
            return;
        }

        teams.forEach(function (team) {
            return request({
                method: 'GET',
                uri: 'http://api.football-data.org/v1/teams/' + team.apiTeamId + '/players?apiKey=c686861cae884c8596fad08aea92403c',
                headers: {
                    'X-Auth-Token': 'c686861cae884c8596fad08aea92403c'
                }
            }, function (err, obj) {
                var playerObj = JSON.parse(obj.body);
                playerObj.players.forEach(function(player){
                    console.log('updating player ', player.name);
                    var updateObj = {
                        name: player.name || null,
                        position: player.position || null,
                        number: player.jerseyNumber || null,
                        dob: player.dateOfBirth || null,
                        nationality: player.nationality || null,
                        updatedAt: new Date(),
                        teamId: team.apiTeamId
                    };
                    //don't update players that don't exist
                    if (player.name) {
                        Player.findOneAndUpdate({name: player.name}, updateObj, {upsert: true}, function (err, obj) {
                            if (err) console.log(err);
                        });
                    }
                });
                if (team){
                    Team.update({_id: team._id}, {$set: {'updates.players': new Date()}}, function (err, obj) {
                        if (err) {
                            console.log('error updating update in team for players', team.name);
                        }
                        console.log('successfully updated', team.name);
                    });
                }
            });
        });

    });
}

function pullTeamsFromLeagues() {
    League.find({}).lean().exec(function (err, leagues) {
        leagues.forEach(function (league) {
            console.log('updating league', league.apiId);
            league.standing.forEach(function (team) {
                var teamId = team._links.team.href.slice(38) || '';
                var updateObj = {
                    wins: team.wins,
                    losses: team.losses,
                    draws: team.draws,
                    points: team.points,
                    position: team.position,
                    name: team.teamName,
                    shortName: team.shortName,
                    crestUrl: team.crestURI,
                    apiTeamId: teamId,
                    apiLeagueId: league.apiId
                };
                Team.findOneAndUpdate({apiTeamId: teamId}, updateObj, {upsert: true}, function (err, obj) {
                    if (err) return;
                    console.log('updated team', team.teamName);
                    return obj;
                });
            });
        });
    });
}

module.exports = serviceObj;
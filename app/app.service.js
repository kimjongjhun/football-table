/**
 * Created by zlaqh on 5/8/17.
 */
angular.module('footballApp')
    .service('appService', ['footballdataFactory', appService]);

function appService(footballdataFactory) {
    var vm = this;
    vm.fbdf = footballdataFactory;

    vm.league;
    vm.leagueTable;
    vm.selectedTeam;
    vm.teamId;
    vm.teamMatches = [];
    vm.pastMatches;
    vm.futureMatches;
    vm.pastCollection;
    vm.futureCollection;
    vm.squad;
    vm.squadList = {};

    vm.formatInfo = formatInfo;
    vm.formatMatches = formatMatches;
    vm.formatSquad = formatSquad;
    vm.getSquad = getSquad;
    vm.getTeamInfo = getTeamInfo;
    vm.goTable = goTable;
    vm.goTeam = goTeam;
    vm.setTeamId = setTeamId;
    vm.test = test;

    function formatInfo() {

    }

    function formatMatches() {
        vm.pastMatches = vm.teamMatches.filter(function(value) {
            return value.status == "FINISHED";
        });
        vm.futureMatches = vm.teamMatches.filter(function(value) {
            return value.status == "TIMED";
        });

        vm.pastMatches = vm.pastMatches.reverse();
        vm.pastCollection = vm.pastMatches;
        vm.futureCollection = vm.futureMatches;
    }

    function formatSquad() {
        vm.squadList.gk = vm.squad.filter(function(value) {
            return value.position == "Keeper"
        });
        vm.squadList.mid = vm.squad.filter(function(value) {
            return value.position == "Central Midfield"
        });
        vm.squadList.def = vm.squad.filter(function(value) {
            return value.position == "Centre-Back"
        });
        vm.squadList.def = vm.squad.filter(function(value) {
            return value.position == "Left-Back"
        });
        vm.squadList.def = vm.squad.filter(function(value) {
            return value.position == "Right-Back"
        });
        vm.squadList.mid = vm.squad.filter(function(value) {
            return value.position == "Defensive Midfield"
        });
        vm.squadList.mid = vm.squad.filter(function(value) {
            return value.position == "Central Midfield"
        });
        vm.squadList.for = vm.squad.filter(function(value) {
            return value.position == "Left Wing"
        });
        vm.squadList.for = vm.squad.filter(function(value) {
            return value.position == "Right Wing"
        });
        vm.squadList.for = vm.squad.filter(function(value) {
            return value.position == "Centre-Forward"
        });
    }

    function getSquad(teamId) {
        vm.fbdf.getPlayersByTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            console.log(_data.data.players);
            vm.squad = _data.data.players;
        });

    }

    function getTeamInfo(teamId) {
        vm.fbdf.getFixturesByTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            vm.teamMatches = _data.data.fixtures;
        });
    }

    function goTable(id) {
        vm.league = id;
        //Show League Table / current standing.
        vm.fbdf.getLeagueTableBySeason({
            id: vm.league,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            vm.leagueTable = _data.data.standing;
        }).catch(function (_data) {

        });
    }

    function goTeam(team) {
        vm.setTeamId(team);
        vm.selectedTeam = team;
    }

    function setTeamId(team) {
        // vm.teamId = team._links.team.href.substring(team._links.team.href.length - 2, team._links.team.href.length.length);
        vm.teamId = team._links.team.href.slice(38);
        vm.getTeamInfo(vm.teamId);
        vm.getSquad(vm.teamId);
        vm.formatInfo();
    }

    function test() {
        console.log("test");
    }
}
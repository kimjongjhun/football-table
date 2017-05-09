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

    vm.formatInfo = formatInfo;
    vm.getTeamInfo = getTeamInfo;
    vm.goTable = goTable;
    vm.goTeam = goTeam;
    vm.setTeamId = setTeamId;
    vm.test = test;

    function formatInfo() {
        vm.pastMatches = vm.teamMatches.filter(function(value) {
            return value.status == "FINISHED";
        });
        vm.futureMatches = vm.teamMatches.filter(function(value) {
            return value.status == "TIMED";
        });
        vm.pastMatches = vm.pastMatches.reverse();
        vm.pastCollection = vm.pastMatches;
        vm.futureCollection = vm.futureCollection;
    }

    function getTeamInfo(teamId) {
        vm.fbdf.getFixturesByTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            vm.teamMatches = _data.data.fixtures;
            console.log(_data.data.fixtures);
            vm.formatInfo(vm.teamMatches);
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
    }

    function test() {
        console.log("test");
    }
}
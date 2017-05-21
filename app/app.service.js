/**
 * Created by zlaqh on 5/8/17.
 */
angular.module('footballApp')
    .service('appService', appService);

appService.$inject = ['footballdataFactory'];

function appService(footballdataFactory) {
    var vm = this;
    vm.fbdf = footballdataFactory;

    vm.landingList = [
        98, 57, 548,
        78, 4, 81,
        5, 108, 109, /*Alphabetized landingList*/
        64, 66, 523,
        524, 86, 12
        /*
         "98", "57", "548",
         "78", "4", "81",
         "5", "108", "109", /!*Alphabetized landingList*!/
         "64", "66", "523",
         "524", "86", "12"*/
    ];
    vm.landingTeam = {
        id: "",
        crestUrl: ""
    };
    vm.landingTeam = [];
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
    vm.squadList = {
        keeper: [],
        defender: [{
            cb: [],
            lb: [],
            rb: [],
            fb: []
        }],
        midfield: [{
            cm: [],
            dm: []
        }],
        forward: [{
            lw: [],
            rw: [],
            cf: [],
        }]
    };
    vm.keepers = [];
    vm.defenders = [];
    vm.midfielders = [];
    vm.forwards = [];

    vm.formatInfo = formatInfo;
    vm.formatMatches = formatMatches;
    vm.formatSquad = formatSquad;
    vm.formatSquadList = formatSquadList;
    vm.getSquad = getSquad;
    vm.goTable = goTable;
    vm.getTeamInfo = getTeamInfo;
    vm.getTeamMatches = getTeamMatches;
    vm.goTeam = goTeam;
    vm.load = load;
    vm.setTeamId = setTeamId;
    vm.test = test;

    function formatInfo() {
    }

    function formatMatches() {
        vm.pastMatches = vm.teamMatches.filter(function (value) {
            return value.status == "FINISHED";
        });
        vm.futureMatches = vm.teamMatches.filter(function (value) {
            return value.status == "TIMED";
        });

        vm.pastMatches = vm.pastMatches.reverse();
        vm.pastCollection = vm.pastMatches;
        vm.futureCollection = vm.futureMatches;
    }

    // @TODO
    // fix formatSquad()
    function formatSquad() {
        vm.squadList.keeper = vm.squad.filter(function (value) {
            return value.position === "Keeper"
        });
        vm.squadList.defender.cb = vm.squad.filter(function (value) {
            return value.position === "Centre-Back"
        });
        vm.squadList.defender.lb = vm.squad.filter(function (value) {
            return value.position === "Left-Back"
        });
        vm.squadList.defender.rb = vm.squad.filter(function (value) {
            return value.position === "Right-Back"
        });
        vm.squadList.midfield.cm = vm.squad.filter(function (value) {
            return value.position === "Central Midfield"
        });
        vm.squadList.midfield.dm = vm.squad.filter(function (value) {
            return value.position === "Defensive Midfield"
        });
        vm.squadList.forward.lw = vm.squad.filter(function (value) {
            return value.position === "Left Wing"
        });
        vm.squadList.forward.rw = vm.squad.filter(function (value) {
            return value.position === "Right Wing"
        });
        vm.squadList.forward.cf = vm.squad.filter(function (value) {
            return value.position === "Centre-Forward"
        });

        vm.formatSquadList();
    }

    function formatSquadList() {
        vm.keepers.concat(vm.squadList.keeper);
        vm.defenders.concat(vm.squadList.defender.cb) /* , vm.squadList.defender.lb, vm.squadList.defender.rb)*/;
        console.log(vm.defenders);
        vm.midfielders.concat(vm.squadList.midfield.dm, vm.squadList.midfield.cm);
        vm.forwards.concat(vm.squadList.forward.lw, vm.squadList.forward.rw, vm.squadList.forward.cf);
    }

    function getSquad(teamId) {
        vm.fbdf.getPlayersByTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            vm.squad = _data.data.players;
            vm.formatSquad();
        });

    }

    function getTeamInfo(teamId) {
        vm.fbdf.getTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            /*
             vm.landingTeam.id.push(teamId);
             vm.landingTeam.crestUrl.push(_data.data);
             */
            vm.landingTeam.push(_data.data);
        })
    }

    function getTeamMatches(teamId) {
        vm.fbdf.getFixturesByTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            vm.teamMatches = _data.data.fixtures;
            vm.formatMatches();
        });
    }

    function goTable(id) {
        vm.league = id;
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

    function load() {
        // for (var a in vm.landingList) {
        //     console.log(a);
        //     vm.getTeamInfo(a);
        // };

        // vm.landingTeam = [{
        //     id: [],
        //     crestUrl: []
        // }];

        vm.landingList.forEach(function (p1) {
            vm.getTeamInfo(p1);
        });
    }

    function setTeamId(team) {
        vm.teamId = team._links.team.href.slice(38);
        vm.getTeamMatches(vm.teamId);
        console.log(vm.teamId);
        vm.getSquad(vm.teamId);
        vm.formatInfo();
    }

    function test() {
        console.log("test");
    }
}
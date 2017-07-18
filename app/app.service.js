/**
 * Created by zlaqh on 5/8/17.
 */
angular.module('footballApp')
    .service('appService', appService);

appService.$inject = ['footballdataFactory', 'tableService'];

function appService(footballdataFactory, tableService) {
    var vm = this;
    vm.fbdf = footballdataFactory;

    // Changed
    vm.teamID;

    // Experimental
    vm.leagueCode = 0;

    // Still need to change
    vm.landingList = [
        98, 57, 548,
        78, 4, 81,
        5, 108, 109, /*Alphabetized landingList*/
        64, 66, 523,
        524, 86, 12
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
            cf: []
        }]
    };
    vm.keepers = [];
    vm.defenders = [];
    vm.midfielders = [];
    vm.forwards = [];

    vm.formatSquad = formatSquad;
    vm.formatSquadList = formatSquadList;
    vm.getSquad = getSquad;
    vm.goTable = goTable;
    vm.getTeamInfo = getTeamInfo;
    vm.getCurrentMatches = getCurrentMatches;

    vm.goTeam = goTeam;
    vm.load = load;
    vm.setTeamId = setTeamId;
    vm.test = test;

    function getCurrentMatches() {
        console.log(vm);
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

    // @TODO
    // In server app.js, NOT COMPLETE
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
        var team = {
            id: '',
            crestUrl: ''
        };
        vm.fbdf.getTeam({
            id: teamId,
            apiKey: config.MY_KEY
        }).then(function (_data) {
            team.id = teamId;
            team.crestUrl = _data.data.crestUrl;
            vm.landingTeam.push(team);
        });
    }

    function goTable(id) {
        vm.league = id;
        console.log('in app service');
        return footballdataFactory.getLeagueTableBySeason({
            leagueId: id
        }).then(function (_data) {
            console.log(_data.data);
        });
    }

    function goTeam(team) {
        if (typeof team != 'number') {
            console.log('help');
            vm.setTeamId(team);
        } else {
            console.log('i am chapi');
            vm.selectedTeam = team;
            console.log('team', vm.selectedTeam);

        }
    }

    function load() {
        if (vm.landingTeam.length < 15) {
            vm.landingTeam = [];
            vm.landingList.forEach(function (p1) {
                vm.getTeamInfo(p1);
            });
        }
    }

    function setTeamId(team) {
        vm.teamId = team._links.team.href.slice(38);
        console.log(vm.teamId);
        vm.getSquad(vm.teamId);
    }

    function test() {
        console.log("test");
    }
}
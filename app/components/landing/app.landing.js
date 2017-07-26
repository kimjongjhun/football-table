/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .component('landing', {
        bindings: {},
        controller: ['$state', 'appService', 'footballdataFactory', landingController],
        controllerAs: 'vm',
        templateUrl: './components/landing/landing.html'
    });

function landingController($state, appService, footballdataFactory) {

    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit,
        fbdf: footballdataFactory,
        getTeamInfo: getTeamInfo,
        load: load,
        goTeam: goTeam,
        landingList: [
            98, 57, 548,
            78, 4, 81,
            5, 108, 109, /*Alphabetized landingList*/
            64, 66, 523,
            524, 86, 12
        ],
        landingTeam: []
    });

    function $onInit() {
        // console.log('the landing component');
        // console.log(vm.landingList);
    }

    function load() {
        if (vm.landingTeam.length < 15) {
            vm.landingTeam = [];
            vm.landingList.forEach(function (p1) {
                vm.getTeamInfo(p1);
            });
        }
    }

    function getTeamInfo(teamId) {
        var team = {
            id: '',
            league: '',
            crestUrl: ''
        };
        vm.fbdf.getTeam({
            id: teamId,
            // apiKey: config.MY_KEY
        }).then(function (_data) {
            team.id = teamId;
            team.league = _data.data.apiLeagueId;
            team.crestUrl = _data.data.crestUrl;
            vm.landingTeam.push(team);
        });
    }

    function goTeam(teamId, leagueId) {
        appService.leagueCode = leagueId;
        // console.log('in landing goTeam ', appService.league);
        $state.go('team', {id: teamId});
    }
}
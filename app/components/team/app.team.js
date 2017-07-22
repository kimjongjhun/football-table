/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .controller('TeamController', ['$state', 'appService', 'teaminfo', 'players', teamController]);

function teamController($state, appService, teaminfo, players) {
    var vm = this;

    vm.id = appService.leagueCode;

    angular.extend(vm, {
        selectedTeam: teaminfo,
        goBack: goBack
    });

    function load() {
        vm.selectedTeam = teaminfo;
        vm.selectedTeam.teamId = vm.selectedTeam.apiTeamId;
        vm.selectedTeam.players = players;
    }

    load();

    function goBack() {
        if (vm.id === 0){
            $state.go('home');
        } else if (vm.id !== 0) {
            $state.go('league', {id: vm.id});
        }
    }
}

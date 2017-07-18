/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .controller('TeamController', ['$state', 'appService', 'teaminfo', teamController]);

function teamController($state, appService, teaminfo) {
    var vm = this;
    vm.id = appService.leagueCode;

    angular.extend(vm, {
        selectedTeam: teaminfo,
        goBack: goBack
    });

    function load() {
        vm.selectedTeam = teaminfo;
        vm.selectedTeam.teamId = vm.selectedTeam.apiTeamId;
    }

    load();

    function goBack() {
        $state.go('league', {id: vm.id});
    }
}

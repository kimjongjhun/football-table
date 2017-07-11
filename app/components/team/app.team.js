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
        vm.selectedTeam.teamId = vm.selectedTeam._links.team.href.slice(38);
    }

    load();

    function goBack() {
        // vm.views = "table";
        console.log('go back button 2');
        console.log(vm.id);
        $state.go('league', {id: vm.id});
    }
}

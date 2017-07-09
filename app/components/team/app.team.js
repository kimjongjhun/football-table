/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .controller('TeamController', ['teaminfo', teamController]);

function teamController(teaminfo) {
    var vm = this;

    angular.extend(vm, {
        selectedTeam: teaminfo
    });

    function load() {
        vm.selectedTeam = teaminfo;
        vm.selectedTeam.teamId = vm.selectedTeam._links.team.href.slice(38);
    }

    load();
}

/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .component('matchTable', {
        bindings: {
            teamId: '<',
            type: '<'
        },
        controller: ['matchService', matchController],
        templateUrl: './components/match/match.html'
    });

function matchController(matchService) {
    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit
    });

    function $onInit() {
        matchService.getTeamMatches(vm.teamId, vm.type)
            .then(function (data) {
                vm.matches = data;
                vm.matchCollection = data;
            })
    }
}
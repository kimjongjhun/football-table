/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .component('matchTable', {
        bindings: {
            unfiltMatches: '<',
            type: '<'
        },
        controller: [matchController],
        templateUrl: './components/match/match.html'
    });

function matchController() {
    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit
    });

    function $onInit() {
        vm.matches = filterMatches(vm.unfiltMatches, vm.type);
        vm.matchCollection = vm.matches;
    }

    function filterMatches(matches, type) {
        if (type === 'Past') {
            return matches.filter(function (value) {
                return value.status === 'FINISHED';
            }).reverse();
        } else if (type === 'Future') {
            return matches.filter(function (value) {
                return value.status === 'TIMED' || value.status === 'SCHEDULED' || value.status == null;
            });
        } else {
            return [];
        }
    }
}
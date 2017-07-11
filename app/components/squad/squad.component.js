/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .component('squad', {
        bindings: {

        },
        controller: ['squadService', controller],
        templateUrl: './components/squad/squad.html'
    });

function controller(squadService) {
    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit
    });

    function $onInit() {
        squadService.getPlayers();
    }
}
/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .component('squad', {
        bindings: {

        },
        controller: controller,
        templateUrl: './components/squad/squad.html'
    });

function controller() {
    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit
    });

    function $onInit() {
        console.log('i have init');
    }
}
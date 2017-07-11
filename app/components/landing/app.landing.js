/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .controller('LandingController', ['landingService', landingController]);

function landingController(landingService) {

    var vm = this;

    vm.test = test;

    function test(teamID) {
        console.log(teamID, 'here in controller');
    }


}
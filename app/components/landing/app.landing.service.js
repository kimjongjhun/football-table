/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .service('landingService', landingService);

landingService.$inject = ['footballdataFactory', 'appService'];

function landingService() {
    var vm = this;
    vm.fbdf = footballdataFactory;
    vm.as = appService;


}
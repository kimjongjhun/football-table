/**
 * Created by zlaqh on 5/8/17.
 */

angular.module('footballApp')
    .controller('MatchController', match);

match.$inject('appService');

function match(appService) {
    var vm = this;
    vm.as = appService;

    vm.team = vm.as.selectedTeam;

}
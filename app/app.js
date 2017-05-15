/**
 * Created by zlaqh on 5/6/17.
 */
angular.module('footballApp',
    ['ui.router', 'jtt_footballdata', 'smart-table'])

    .controller('MainController', ['appService', 'footballdataFactory', mainController]);

function mainController(appService, footballdataFactory) {
    var vm = this;
    vm.as = appService;
    vm.fbdf = footballdataFactory;

    vm.views = 'landing';

    vm.league = vm.as.league;
    vm.leagueTable = vm.as.leagueTable;
    vm.selectedTeam = vm.as.selectedTeam;

    vm.goBack = goBack;
    vm.goHome = goHome;
    vm.goTable = goTable;
    vm.goTeam = goTeam;
    vm.test = test;

    function goHome() {
        vm.views = 'landing';
    }

    function goTable(id) {
        vm.views = "table";
        vm.as.goTable(id);
    }

    function goTeam(team) {
        vm.views = "team";
        vm.as.goTeam(team);
    }

    function goBack() {
        vm.views = "table";
    }

    function test() {
        console.log('test');
    }
}
/**
 * Created by zlaqh on 5/6/17.
 */
angular.module('footballApp',
    ['ui.router', 'jtt_footballdata', 'smart-table'])

    .controller('MainController', ['$state', 'appService', 'footballdataFactory', mainController]);

function mainController($state, appService, footballdataFactory) {
    var vm = this;
    vm.as = appService;
    vm.fbdf = footballdataFactory;

    vm.testVar;
    // vm.views = "landing";

    // vm.league = vm.as.league;
    // vm.leagueTable = vm.as.leagueTable;
    // vm.selectedTeam = vm.as.selectedTeam;

    vm.goHome = goHome;
    vm.goTable = goTable;
    vm.test = test;

    function goHome() {
        // vm.views = "landing";
        $state.go('home');
    }

    function goTable(id) {
        vm.testVar = id;
        vm.as.leagueCode = id;
        console.log(vm.as.leagueCode);
        // vm.as.goTable(id);
        $state.go('league', {id: id, TableData: id});
    }

    function test() {
        console.log(vm.testLeague);
        console.log('testing');
        $state.go('error', {id: vm.testVar});
    }

    // $state.go('home');
}
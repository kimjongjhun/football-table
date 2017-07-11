/**
 * Created by zlaqh on 5/6/17.
 */
angular.module('footballApp',
    ['ui.router', 'jtt_footballdata', 'smart-table'])

    .controller('MainController', ['$state','appService', 'footballdataFactory', mainController]);

function mainController($state, appService, footballdataFactory) {
    var vm = this;
    vm.as = appService;
    vm.fbdf = footballdataFactory;

    // vm.views = "landing";

    // vm.league = vm.as.league;
    // vm.leagueTable = vm.as.leagueTable;
    // vm.selectedTeam = vm.as.selectedTeam;

    vm.goHome = goHome;
    vm.goTable = goTable;

    function goHome() {
        // vm.views = "landing";
        $state.go('home');
    }

    function goTable(id) {
        vm.as.leagueCode = id;
        $state.go('league', {id: id});
    }

    $state.go('home');
}
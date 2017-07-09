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

    vm.views = "landing";

    vm.league = vm.as.league;
    vm.leagueTable = vm.as.leagueTable;
    vm.selectedTeam = vm.as.selectedTeam;

    vm.goBack = goBack;
    vm.goHome = goHome;
    vm.goTable = goTable;
    vm.goTeam = goTeam;

    function goHome() {
        vm.views = "landing";
    }

    function goTable(id) {
        console.log(id);
        $state.go('league', {id: id});
    }

    function goTeam(team) {
        console.log('should not run');
        // $state.go('league', {id: team});
    }

    function goBack() {
        vm.views = "table";
    }

    $state.go('home');
}
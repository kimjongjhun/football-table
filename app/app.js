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

    vm.goHome = goHome;
    vm.goTable = goTable;
    vm.searchTeam = searchTeam;

    function goHome() {
        $state.go('home');
    }

    function goTable(id) {
        vm.testVar = id;
        vm.as.leagueCode = id;
        // console.log(vm.as.leagueCode);
        $state.go('league', {id: id, TableData: id});
    }
    // $state.go('home');

    function searchTeam(searchTeam) {
        if (searchTeam) {
            console.log('searching for team:', searchTeam);
        }
    }
}
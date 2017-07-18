/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .controller('TableController', ['$state','TableData', tableController]);

function tableController($state, TableData) {
    var vm = this;
    angular.extend(vm, {
        leagueTable: TableData,
        goTeam: goTeam
    });

    function goTeam(team){
        var id = team._links.team.href.slice(38);
        $state.go('team', {id:id});
    }
}
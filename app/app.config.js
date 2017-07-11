/**
 * Created by zlaqh on 5/6/17.
 */

angular.module('footballApp')
    .config(['$stateProvider', routing]);

function routing($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'components/landing/landing.html',
            controller: 'MainController',
            controllerAs: 'vm'
        })
        .state('league', {
            url: '/league/:id',
            templateUrl: 'components/table/table.html',
            controller: 'TableController',
            controllerAs: 'vm',
            resolve: {
                TableData: function($stateParams, tableService) {
                    return tableService.getLeagueData($stateParams.id);
                }
            }
        })
        .state('team', {
            url: '/team/:id/{teaminfo:json}',
            templateUrl: 'components/team/team.html',
            controller: 'TeamController',
            controllerAs: 'vm',
            resolve: {
                teaminfo: function($stateParams, teamService) {
                    return $stateParams.teaminfo;
                }
            }
        })
}
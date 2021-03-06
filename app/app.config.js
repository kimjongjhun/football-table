/**
 * Created by zlaqh on 5/6/17.
 */

angular.module('footballApp')
    .config(['$stateProvider', '$urlRouterProvider', routing]);

function routing($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            component: 'landing',
            resolve: {
                landingList: function(appService) {
                    return appService.landingList;
                }
            }
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
            url: '/team/:id',
            templateUrl: 'components/team/team.html',
            controller: 'TeamController',
            controllerAs: 'vm',
            resolve: {
                teaminfo: function($stateParams, teamService) {
                    return teamService.getTeamInfo($stateParams.id).then(function(data){
                        return data.data;
                    });
                },
                players: function($stateParams, squadService) {
                    return squadService.getPlayers($stateParams.id).then(function(data){
                        return data.data;
                    });
                }
            }
        })
        .state('error', {
            url: '/error/:id/',
            templateUrl: 'components/error/error.html',
            controller: 'MainController',
            controllerAs: 'vm'

        })
}
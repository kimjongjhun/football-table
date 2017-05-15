/**
 * Created by zlaqh on 5/6/17.
 */

angular.module('footballApp')
    .config(['$stateProvider', routing]);

function routing($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/components/landing/landing.html'
        })
        .state('bundesliga', {
            url: '/bundesliga',
            templateUrl: 'app/components/table/table.html'
        })
        .state('laLiga', {
            url: '/la-liga',
            templateUrl: 'app/components/table/table.html'
        })
        .state('ligue1', {
            url: '/ligue-1',
            templateUrl:'app/components/table/table.html'
        })
        .state('premierLeague', {
            url: '/premier-league',
            templateUrl:'app/components/table/table.html'
        })
        .state('serieA', {
            url: '/serie-a',
            templateUrl:'app/components/table/table.html'
        })
}
/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

.service('matchService', matchService);

matchService.$inject = ['footballdataFactory', 'appService'];

function matchService(footballdataFactory, appService) {
    var service = {};
    angular.extend(service, {
        getTeamMatches: getTeamMatches
    });

    function getTeamMatches(teamId, type) {
        return footballdataFactory.getFixturesByTeam({
            teamId: teamId,
            // apiKey: 'c686861cae884c8596fad08aea92403c'
        }).then(function (_data) {
            if (type === 'past') {
                return _data.data.fixtures.filter(function (value) {
                    return value.status === 'FINISHED';
                }).reverse();
            } else if (type === 'future'){
                return _data.data.fixtures.filter(function (value) {
                    return value.status === 'TIMED' || value.status == null;
                });
            } else {
                return [];
            }
        });
    }


    return service;

}
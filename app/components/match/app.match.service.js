/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

.service('matchService', matchService);

matchService.$inject = ['footballdataFactory'];

function matchService(footballdataFactory) {
    var service = {};
    angular.extend(service, {
        getTeamMatches: getTeamMatches
    });

    function getTeamMatches(teamId, type) {
        return footballdataFactory.getFixturesByTeam({
            teamId: teamId
        }).then(function (_data) {
            if (type === 'Past') {
                return _data.data.fixtures.filter(function (value) {
                    return value.status === 'FINISHED';
                }).reverse();
            } else if (type === 'Future'){
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
/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .service('teamService', teamService);

teamService.$inject = ['footballdataFactory', 'appService'];

function teamService(footballdataFactory, appService) {
    var service = {};
    angular.extend(service, {
        getTeamInfo: getTeamInfo
    });

    function getTeamInfo(id){
        return footballdataFactory.getTeam({
            id: id,
            apiKey: 'c686861cae884c8596fad08aea92403c'
        });
    }


    return service;

}
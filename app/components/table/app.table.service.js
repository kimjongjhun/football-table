/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .service('tableService', tableService);

tableService.$inject = ['footballdataFactory', 'appService'];

function tableService(footballdataFactory, appService) {
    var service = {};
    angular.extend(service, {
        getLeagueData: getLeagueData
    });

    function getLeagueData(id){
        return footballdataFactory.getLeagueTableBySeason({
            id: id,
            apiKey: 'c686861cae884c8596fad08aea92403c'
        }).then(function (_data) {
            return _data.data.standing;
        })
    }

    return service;
}
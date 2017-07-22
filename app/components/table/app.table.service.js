/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')

    .service('tableService', tableService);

tableService.$inject = ['footballdataFactory'];

function tableService(footballdataFactory) {
    var service = {};
    angular.extend(service, {
        getLeagueData: getLeagueData
    });

    function getLeagueData(id){
        // console.log('in app table service');
        return footballdataFactory.getLeagueTableBySeason({
            id: id
            // apiKey: 'c686861cae884c8596fad08aea92403c'
        }).then(function (_data) {
            return _data.data.standing;
        })
    }

    return service;
}
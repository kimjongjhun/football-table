angular.module('footballApp')

    .service('squadService', squadService);

squadService.$inject = ['footballdataFactory'];

function squadService(footballdataFactory) {
    var vm = this;

    angular.extend(vm, {
        getPlayers: getPlayers
    });

    function getPlayers() {
        console.log('going to get players');
    }
}
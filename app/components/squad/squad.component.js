/**
 * Created by zlaqh on 7/7/17.
 */

angular.module('footballApp')
    .component('squad', {
        bindings: {
            unfiltPlayers: '<'
        },
        controller: [controller],
        templateUrl: './components/squad/squad.html'
    });

function controller() {
    var vm = this;

    angular.extend(vm, {
        $onInit: $onInit
    });


    function $onInit() {
        vm.data = [];
        filterPlayers(vm.unfiltPlayers);
    }

    function filterPlayers(players) {
        var keepers = {
            title: 'Keeper',
            type: 'keeper', players: []
        };
        var defenders = {
            title: 'Defender',
            type: 'defender', players: []
        };
        var midfielders = {
            title: 'Midfielder',
            type: 'midfielder', players: []
        };
        var forwards = {
            title: 'Forward',
            type: 'forward', players: []
        };

        players.forEach(function (player) {
            switch (player.position) {
                case 'Keeper': {
                    keepers.players.push(player);
                    break;
                }
                case 'Left-Back':
                case 'Right-Back':
                case 'Centre-Back': {
                    defenders.players.push(player);
                    break;
                }
                case 'Central Midfield':
                case 'Attacking Midfield':
                case 'Defensive Midfield':
                case 'Right Midfield':
                case 'Left Midfield': {
                    midfielders.players.push(player);
                    break;
                }
                case 'Left Wing':
                case 'Right Wing':
                case 'Centre-Forward':
                case 'Striker': {
                    forwards.players.push(player);
                    break;
                }
                default: {
                    break;
                }
            }
        });

        keepers.players.sort(function (a, b) {
            return a.number - b.number;
        });
        defenders.players.sort(function (a, b) {
            return a.number - b.number;
        });
        midfielders.players.sort(function (a, b) {
            return a.number - b.number;
        });
        forwards.players.sort(function (a, b) {
            return a.number - b.number;
        });

        vm.data.push(keepers, defenders, midfielders, forwards);
    }
}
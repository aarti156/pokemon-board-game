angular.module('pokemon', [
  'pokemon.board',
  'pokemon.home',
  'pokemon.starter',
  'ngRoute'
])
.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: 'home/home.html',
      conroller: 'homeController'
    })
    .when('/board', {
      templateUrl: 'board/board.html',
      controller: 'boardController'
    })
    .when('/starter', {
      templateUrl: 'starterPokemon/starterPokemon.html',
      controller: 'starterController'
    });

});
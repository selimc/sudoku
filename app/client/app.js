angular.module('sudoku', [
  'sudoku.boards',
  'sudoku.services',
  'sudoku.create',
  'ngRoute'
  ])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/boards', {
      templateUrl: 'boards/boards.html',
      controller: 'BoardController'
    })
    .when('/createBoard', {
      templateUrl: 'create/create.html',
      controller: 'CreateController'
    })
    .otherwise({
      redirectTo: '/boards'
    });
})
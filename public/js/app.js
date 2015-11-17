'use strict';

/* App Module */

var app = angular.module('app', [
	'ui.router'
]);

app.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

	$stateProvider.
    state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })

}]);
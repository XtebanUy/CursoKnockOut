(
	function()
	{
		var app = angular.module('mainApp', ['ngRoute','mainApp.storageModule', 'mainApp.storageModuleServer']);
		app .config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/people', {
				templateUrl: 'people.html',
				controller: 'ListUserController',
				controllerAs: 'personController'
			}).
			when('/people/edit/:id', {
				templateUrl: 'addOrEditPerson.html',
				controller: 'EditUserController',
				controllerAs: 'personController'
			}).
			when('/people/create', {
				templateUrl: 'addOrEditPerson.html',
				controller: 'CreateUserController',
				controllerAs: 'personController'
			}).
			otherwise({
				redirectTo: '/people'
			});
		}]);
	}
)()
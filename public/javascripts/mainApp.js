(
	function()
	{
		var app = angular.module('mainApp', ['ngRoute','mainApp.storageModule', 'mainApp.storageModuleServer', 'mainApp.userDiretives']);
		app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.
			when('/people/create', {
				templateUrl: 'addOrEditPerson.html',
				controller: 'CreateUserController',
				controllerAs: 'personController'
			}).
			when('/people/:id', {
				templateUrl: 'userView.html',
				controller: 'ViewUserController',
				controllerAs: 'personController'
			}).
			when('/people/edit/:id', {
				templateUrl: 'addOrEditPerson.html',
				controller: 'EditUserController',
				controllerAs: 'personController'
			}).
			when('/people', {
				templateUrl: 'people.html',
				controller: 'ListUserController',
				controllerAs: 'personController'
			}).
			otherwise({
				redirectTo: '/people'
			});
		}]);
	}
)()
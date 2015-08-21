(
	function()
	{
		var app = angular.module('mainApp');
		app.controller('ListUserController', ['$scope', '$location', '$timeout', 'sevicesStorageServer', function($scope, $location, $timeout, serviceStorage)
		{
			/*this.fullName = function(person)
			{
				return person.firstName + " " + person.lastName; 
			};*/
			
			$scope.edit = function(person)
			{
				$location.path('/people/edit/'+person.id)	
			};
			$scope.view = function(person)
			{
				$location.path('/people/'+person.id)	
			};
			$scope.create = function(person)
			{
				$location.path('/people/create');	
			};
			$scope.delete = function(person)
			{
				serviceStorage.peopleService.delete(person.id)
				.then(function()
					{
						lodPeople();
					});
			};
			var lodPeople = function()
			{
			serviceStorage.peopleService.getAll()
			.then(function(data)
				{
					//$timeout(function() {
						$scope.people = data;	
					//})
				});
			}
			lodPeople();
			
		}]);
		
		app.controller('EditUserController', ['$scope', '$routeParams', '$location', '$timeout', 'sevicesStorageServer', function($scope, $routeParams, $location, $timeout , serviceStorage)
		{
			$scope.savePerson = function()
			{
				serviceStorage.peopleService.update($scope)
				.then(function()
				{
					$location.path('/people');
				})
			}
			$scope.cancel = function()
			{
				$location.path('/people');
			}
			serviceStorage.peopleService.get(parseInt($routeParams.id))
			.then(function(data)
			{
				//$timeout(function() {
					$scope.id = data.id;
					$scope.firstName = data.firstName;
					$scope.lastName = data.lastName;
					$scope.sex = data.sex;
 				//})
				
			});
			
			
		}]);
		
		app.controller('CreateUserController', ['$scope', '$routeParams', '$location', '$timeout', 'sevicesStorageServer', function($scope, $routeParams, $location, $timeout , serviceStorage)
		{
			
			$scope.savePerson = function()
			{
				serviceStorage.peopleService.add($scope)
				.then(function()
				{
					$location.path('/people');
				})
			}
			$scope.cancel = function()
			{
				$location.path('/people');
			}
		}]);
		
		app.controller('ViewUserController', ['$scope', '$routeParams', '$location', '$timeout', 'sevicesStorageServer', function($scope, $routeParams, $location, $timeout , serviceStorage)
		{
			$scope.person = {}
			$scope.cancel = function()
			{
				$location.path('/people');
			}
			serviceStorage.peopleService.get(parseInt($routeParams.id))
			.then(function(data)
			{
				$scope.person.id = data.id;
				$scope.person.firstName = data.firstName;
				$scope.person.lastName = data.lastName;
				$scope.person.sex = data.sex;
			
			});
			
			
		}]);
	}
)()
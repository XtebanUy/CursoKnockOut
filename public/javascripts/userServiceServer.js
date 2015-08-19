
(function () {
	var app = angular.module("mainApp.storageModuleServer", []);

	app.factory('sevicesStorageServer', ['$q', '$http', function ($q, $http) {
		
		var addPerson = function (personDto) {
			var data = {
				"firstName": personDto.firstName,
				"lastName": personDto.lastName,
				"sex": personDto.sex
			};
			var q = $q.defer();
			$http.post('/people', data).then(function(res)
				{
					q.resolve(res.data);
				},
				function(res)
				{
					q.reject()
				}
			);
			return q.promise;
	
		};
		var updatePerson = function (personDto) {
			var data = {
				"firstName": personDto.firstName,
				"lastName": personDto.lastName,
				"sex": personDto.sex
			};
			var q = $q.defer();
			$http.put('/people/'+ personDto.id , data).then(function(res)
				{
					q.resolve(res.data);
				},
				function(res)
				{
					q.reject()
				}
			);
			return q.promise;
		};

		var getPerson = function (id) {
			var q = $q.defer();
			$http.get('/people/'+ id).then(function(res)
				{
					q.resolve(res.data);
				},
				function(res)
				{
					q.reject()
				}
			);
			return q.promise;
		};

		var deletePerson = function (id) {
			var q = $q.defer();
			$http.delete('/people/'+ id).then(function(res)
				{
					q.resolve(res.data);
				},
				function(res)
				{
					q.reject()
				}
			);
			return q.promise;
		};

		var getAllPeople = function () {
			var q = $q.defer();
			$http.get('/people').then(function(res)
				{
					q.resolve(res.data);
				},
				function(res)
				{
					q.reject()
				}
			);
			return q.promise;
		};
		
		
		return {
					peopleService:
					{
						add: addPerson,
						get: getPerson,
						update: updatePerson,
						delete: deletePerson,
						getAll: getAllPeople
					}
				}
	}]);
})()
				
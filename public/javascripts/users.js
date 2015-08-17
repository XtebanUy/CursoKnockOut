/* global ko */
(function ($, ko) {
	var handler = function (event, peopleService) {
		function Person(id, firstName, lastName, sex) {
			var self = this;
			this.id = id,
			this.firstName = ko.observable(firstName ? firstName : '');
			this.lastName = ko.observable(lastName ? lastName : '');
			this.sex = ko.observable(sex);
			this.fullName = ko.computed(function () {
				return self.firstName() + " " + self.lastName();
			});
		}

		function PersonManager(people) {
			var self = this;
			this.person = ko.observable(null);
			this.people = ko.observableArray(people);
			
			this.reloadPeople = function()
			{
				peopleService.getAll()
				.done(function(data)
					{
						self.people(data.map(function(value, index , array)
						{
							return new Person(value.id, value.firstName, value.lastName, value.sex);
						}));
					});
			}
			
			this.createPerson = function () {
				self.person(new Person(null, null, null, null));
			};
			
			this.savePerson = function () {
				var q = (self.person().id === null) ? 
					peopleService.add(ko.toJS(self.person())) : peopleService.update(ko.toJS(self.person()));
				q.done(function()
				{
					self.person(null);
					self.reloadPeople();
				});
			
			};
			this.deletePerson = function (person) {
				peopleService.delete(ko.toJS(person).id)
				.done(function()
				{
					self.reloadPeople();
				});
			}
			this.editPerson = function (person) {
				peopleService.get(ko.toJS(person).id)
				.done(function(personToEditdata)
				{
					self.person(new Person(personToEditdata.id, personToEditdata.firstName, personToEditdata.lastName, personToEditdata.sex));
				});
			}
		}
		var personManager = new PersonManager([]);
		personManager.reloadPeople();
		ko.applyBindings(personManager, document.getElementById("main"));
		$(document).off("storageReady", handler)
	} 
	$(document).on("storageReady", handler)
})($, ko);
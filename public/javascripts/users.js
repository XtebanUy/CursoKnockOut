/* global ko */
(function(ko)
	{
		function Person(firstName, lastName)
		{
			var self = this;
			this.firstName = ko.observable(firstName ? firstName : '');
			this.lastName = ko.observable(lastName ? lastName : '');
			this.fullName = ko.computed(function()
			{
				return self.firstName() + " " +self.lastName();
			});
		}
		
		function PersonManager(people) {
			var self = this;
			this.person = ko.observable(null);
			this.people = ko.observableArray(people);
			this.createPerson = function()
			{
				self.person(new Person(null, null));  
			};
			this.addPerson = function()
			{
				self.people.push(self.person());
				self.person(null);
			};
		}
		var personManager = new PersonManager([new Person("Pepe", "Mujica")]);
		ko.applyBindings(personManager, document.getElementById("main"));
	}
)(ko);
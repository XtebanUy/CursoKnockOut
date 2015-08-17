(function ($) {
	((
		function () {
			var q = $.Deferred();
			var persistence = {};
			window.indexedDB = window.indexedDB || window.webkitIndexedDB ||
			window.mozIndexedDB;
	
			/*if ('webkitIndexedDB' in window) {
				window.IDBTransaction = window.webkitIDBTransaction;
				window.IDBKeyRange = window.webkitIDBKeyRange;
			}*/

			persistence.indexedDB = {};
			persistence.indexedDB.db = null;

			persistence.indexedDB.onerror = function (e) {
				console.log(e);
			};

			persistence.indexedDB.open = function () {
				var version = 1;
				var request = indexedDB.open("people", version);
		
				// We can only create Object stores in a versionchange transaction.
				request.onupgradeneeded = function (e) {
					var db = e.target.result;
		
					// A versionchange transaction is started automatically.
					e.target.transaction.onerror = persistence.indexedDB.onerror;

					if (db.objectStoreNames.contains("people")) {
						db.deleteObjectStore("people");
					}

					var peopleStore = db.createObjectStore("people", { keyPath: "id", autoIncrement: true });
					peopleStore.createIndex("firstName", "firstName", { unique: false });
					peopleStore.createIndex("lastName", "lastName", { unique: false });
					peopleStore.createIndex("sex", "sex", { unique: false });
				}

				request.onsuccess = function (e) {
					persistence.indexedDB.db = e.target.result;
					q.resolve({
						peopleService:
						{
							add: persistence.indexedDB.addPerson,
							get: persistence.indexedDB.getPerson,
							update: persistence.indexedDB.updatePerson,
							delete: persistence.indexedDB.deletePerson,
							getAll: persistence.indexedDB.getAllPeople
						}
					});
				};

				request.onerror = function (event) {
					q.reject(event);
				}
			};

			persistence.indexedDB.addPerson = function (personDto) {
				var q = $.Deferred();
				var db = persistence.indexedDB.db;
				var trans = db.transaction(["people"], "readwrite");
				var store = trans.objectStore("people");

				var data = {
					"firstName": personDto.firstName,
					"lastName": personDto.lastName,
					"sex": personDto.sex
				};

				var request = store.put(data);

				request.onsuccess = function (event) {
					q.resolve(event.target.result);
				};

				request.onerror = function (event) {
					q.reject(event);
				};
				return q.promise();
			};
			persistence.indexedDB.updatePerson = function (personDto) {
				var q = $.Deferred();
				var db = persistence.indexedDB.db;
				var trans = db.transaction(["people"], "readwrite");
				var store = trans.objectStore("people");
				var request = store.get(personDto.id);

				request.onsuccess = function (event) {
					var data = request.result;
  
					// update the value(s) in the object that you want to change
					data.firstName = personDto.firstName;
					data.lastName = personDto.lastName,
					data.sex = personDto.sex
				
					// Put this updated object back into the database.
					var requestUpdate = store.put(data);

					requestUpdate.onsuccess = function (event) {
						q.resolve();
					};
					requestUpdate.onerror = function (event) {
						q.reject(event);
					};
				};

				request.onerror = function (event) {
					q.reject(event);
				};
				return q.promise();
			};

			persistence.indexedDB.getPerson = function (id) {
				var q = $.Deferred();
				var db = persistence.indexedDB.db;
				var trans = db.transaction(["people"], "readonly");
				var store = trans.objectStore("people");
				var request = store.get(id);

				request.onsuccess = function (event) {
					var data = request.result;
					q.resolve(data);

				};

				request.onerror = function (event) {
					q.reject(event);
				};
				return q.promise();
			};

			persistence.indexedDB.deletePerson = function (id) {
				var q = $.Deferred();
				var db = persistence.indexedDB.db;
				var trans = db.transaction(["people"], "readwrite");
				var store = trans.objectStore("people");

				var request = store.delete(id);

				request.onsuccess = function (e) {
					q.resolve();
				};

				request.onerror = function (event) {
					q.reject(event);
				};
				return q.promise();
			};

			persistence.indexedDB.getAllPeople = function () {
				var q = $.Deferred();
				var db = persistence.indexedDB.db;
				var trans = db.transaction(["people"], "readonly");
				var store = trans.objectStore("people");
		
				// Get everything in the store;
				var keyRange = IDBKeyRange.lowerBound(0);
				var cursorRequest = store.openCursor(keyRange);
				var users = [];
				cursorRequest.onsuccess = function (event) {
					var result = event.target.result;
					if (!!result == false) {
						q.resolve(users);
						return;
					}
					users.push(result.value);
					result.continue();
				};

				cursorRequest.onerror = function (event) {
					q.reject(event);
				}
				return q.promise();
			};
			function init() {
				persistence.indexedDB.open();
			}
			window.addEventListener("DOMContentLoaded", init, false);
			return q.promise();
		}
		)()).then(function (services) {
			$(document).trigger("storageReady", [services.peopleService]);
		})
})($)
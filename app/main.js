angular.module('AddressBook', [])
	.service('contactService', function ($http) {
		this.contacts = []; //when the contact service intializes it will make the http request to the simple express backend
		$http.get('http:localhost:9001/contacts', function (res) {
			console.log(res);
		})

	});
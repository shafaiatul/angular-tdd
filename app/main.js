angular.module('AddressBook', [])
	.service('contactService', function ($http) {
		this.contacts = []; //when the contact service intializes it will make the http request to the simple express backend
		var contactService = this;
    $http.get('http://localhost:9001/contacts')
      .then(function (res) {
			console.log(res);
      while(res.data[0]){
        contactService.contacts.push(res.data.pop());
      }
		})

	})
  // ContactController will get the contact from contactervice and add it to the scope
  .controller('ContactController', function (contactService, $scope) {
      $scope.contacts = contactService.contacts;
  })

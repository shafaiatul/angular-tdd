var assert = chai.assert;
var expect = chai.expect;

describe('The Address book app', function () {
	describe('the contact service', function () {
		 beforeEach(function () { //'beforeEach' function is a function which will run before every test.
          module('AddressBook') //my entire app will be available for the rest of the test
          //inject will create a special space (a closure) thru which I can get access to the angular function
          inject(function($injector){
            contactService = $injector.get('contactService'); //now I have access to contactService
            $httpBackend = $injector.get('$httpBackend'); //now I have access to httpBackend service
          });
     })


     it('should have a property contacts, an array', function () {
		 	  expect(contactService.contacts).to.be.an('array');
		 });

     //we know the contactService made a http request to the server, lets test this
     it('should call the backend', function () {
        $httpBackend.expectGET('http:localhost:9001/contacts')
            .respond(200, []);
        $httpBackend.flush(); // by this I can assert our application not making any unexpected requests.
     });
	})
})

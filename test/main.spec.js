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
        $httpBackend.expectGET('http://localhost:9001/contacts')
            .respond(200, []);
        $httpBackend.flush(); // by this I can assert our application not making any unexpected requests.
     });
	})

  describe('the contact controller', function () {
    beforeEach(function () {
      module('AddressBook');
      inject(function($injector, $rootScope) { // inject() is used to inject arguments of all given functions
        //As you TEST the 'controller', you create a special version of scope that you pass to that controller
        $scope = $rootScope.$new();
        contactService = $injector.get('contactService'); //now I have access to contactService
        $httpBackend = $injector.get('$httpBackend'); //now I have access to httpBackend service
        $controller = $injector.get('$controller');
      })
    })
    it('should store an array of contacts in scope', function () {
      //I will invoke the controller with $controller and it takes an object with arguments
      $controller('ContactController', {$scope: $scope, contactService: contactService });
      assert.isArray($scope.contacts);
    })
  })

  describe('the proper filter', function () {
    beforeEach(function () {
      module('AddressBook');
      inject(function($injector) {
        proper = $injector.get('$filter')('proper'); //now I have a instance of the filter
      })
    })

    it('should proper case a string', function () {
      expect(proper('shafaiatul islam')).to.equal('Shafaiatul Islam');
    })

    it('should take a number and return that as a string', function () {
      expect(proper(42)).to.equal('42');
    })

    it('should throw an error on an incompatible type', function () {
      //for error (undefined or null), I have to throw it in a function closure
      assert.throw(function () {
        proper(undefined);
      });
    })
  })

  describe('avatar', function () {
    beforeEach(function () {
      module('AddressBook');
    })

    it('should display the capitalized first letter of a name', function () {
      //To test the directive I will need the $rootScope and $compile
      inject(function ($rootScope, $compile) {
        //$compile is used to link the scope and template together
        $rootScope.contact = {name: 'joe aron'};
        //by using $compile function we can virtually create directive
        var element = $compile('<avatar name=contact.name/>')($rootScope);
        //now everything is setup, I need to digest
        $rootScope.$digest();
        //now I can grab the actual compiled text from the directive
        var dirText = element.text();
        expect(dirText).to.equal('J');
      })
    })
  })
})

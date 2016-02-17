
app.controller('AppCtrl', ['$scope', '$http', 'MessageService', '$window', '$rootScope', 
	function($scope, $http, MessageService, $window, $rootScope){
	console.log("Hello from controller");

	//get user name from AuthService
	var userName = $rootScope.username;
	$scope.userName = userName;

	var refresh = function(){
		MessageService.get().success(function(response){
			console.log("get response from server");

			$scope.messages = response;
			//clear the input
			$scope.newMessage = "";
		});
	};

	refresh();

	$scope.sendMessage = function (){
		$scope.newMessage.sender = userName;
		// console.log($scope.newMessage);

		MessageService.send($scope.newMessage).success(function(response){
			// console.log(response);
			refresh();
		});
	};

	$scope.remove = function (id){
		console.log("remove: " + id);
		//send the index as a param
		MessageService.delete(id).success(function(response){
			refresh();
		});
	};

	$scope.retrieve = function(id){
		console.log("retrieve: " + id);
		var Palindrome = isPalindrome("abccbba");
		
		$http.get('/messages/' + id).success(function(response){
			// console.log(response.message);
			var alert = "The retrieved message is: " + response.message + "\n" + "Is it Palindrome?   " + isPalindrome(response.message);
			$window.alert(alert);
		});
	};

	$scope.deselect = function(){
		$scope.newMessage = "";
		$scope.search = "";
	}

	var isPalindrome = function(s) {
        if(s === null){
            return false;
        }
        
        if(s.length === 0){
            return true;
        }
        
        s = s.replace("[^a-zA-Z0-9]","").toLowerCase();
        
        for(var i = 0; i < s.length; i++){
            if(s.charAt(i) != s.charAt(s.length - 1 - i)){
                return false;
            }
        }
        
        return true;
	};

}]);
//--------------------------------------------------------

app.controller('loginController',
  ['$scope', '$location', 'AuthService','$rootScope',
  function ($scope, $location, AuthService, $rootScope) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        // handle success
        .then(function () {
          console.log($rootScope.username);
          $location.path('/');
          $scope.disabled = false;
          $scope.loginForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });

    };

}]);

app.controller('logoutController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()
        .then(function () {
          $location.path('/login');
        });

    };

}]);

app.controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)
        // handle success
        .then(function () {
          $location.path('/login');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Already existing!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);
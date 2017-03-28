app.controller('UserController', function($scope, $rootScope, $location,
		$cookieStore, UserService) {
	$scope.users;

	$scope.friends1;
	$scope.user = {
		userid : '',
		city : '',
		dateofbirth : '',
		email : '',
		enabled : '',
		fullname : '',
		gender : '',
		isOnline : '',
		mobileno : '',
		password : '',
		role : '',
		status : '',
		username : '',

	};
	$scope.message;
	$scope.errorMessage;
	// Count the Users List
	 $scope.count;

	$scope.viewuser = {
		userid : '',
		dateofbirth : '',
		fullname : '',
		gender : '',
		mobileno : '',
		email : '',
		username : '',
		password : '',
		city : ''

	}

	function fetchAllUsers() {
		console.log('entering fetchall users in user controller')
		UserService.fetchAllUsers().then(function(d) {
			$scope.users = d;
			//
			// $scope.count = $scope.users.length;
		}, function(error) {
			console.log(error);
		})
	}
	fetchAllUsers();

	$scope.submit = function() {
		console.log('Entering - submit function in usercontroller')
		UserService.authenticate($scope.user).then(function(response) {
			$scope.user = response.data;
			$rootScope.currentUser = $scope.user;
			$cookieStore.put('currentUser', $rootScope.currentUser);

			fetchAllUsers();
			$location.path("/home");
		}, function(response) {// invalid user name and password -
			// failure
			console.log('invalid username and password')
			$scope.message = "Invalid Username and Password";
			$location.path("/login");

		})

	}

	function getUserById(id) {
		console.log("entering get user in controller with id " + id)
		BlogService.getUserById(id).then(function(response) {
			console.log(response.status);
			$scope.viewuser = response.data;
			$location.path('/viewProfile')
		}, function() {
			console.log("unable to get the record")
		})
	}

	$rootScope.logout = function() {
		console.log('logout function')
		delete $rootScope.currentUser;

		UserService.logout().then(function(response) {
			console.log("logged out successfully..");
			$scope.message = "Logged out Successfully";
			$cookieStore.remove('currentUser');
		  //$cookies.put('currentUser', $rootScope.currentUser);
			$location.path('/login')

		}, function(response) {
			console.log(response.status);
		})
	}

	$scope.registerUser = function() {
		console.log('entering registerUser')
		$scope.user.isOnline = false;
		$scope.user.status = 'P';
		$scope.user.enabled = false;
		// $scope.count = $scope.users.length;

		UserService.registerUser($scope.user).then(
				function(response) { // success
					console.log("registration success" + response.status)
					$location.path("/home");
				},
				function(response) {// failure
					console.log("registration failed" + response.status)
					console.log(response.data)
					$scope.errorMessage = "Registration failed...."
							+ response.data.message
					$location.path("/login")
				})
	}

	$scope.deleteUser = function(id) {
		console.log("entering delete user in controller with id " + id)
		UserService.deleteUser(id).then(function(d) {
			console.log('deleted successfully')
			console.log(d)
			fetchAllUsers();

			// $scope.count = $scope.users.length;
			$location.path('/listUsers')
		}, function() {
			console.log("unable to delete the record")
		})

	}
	$scope.friendRequest = function(username) {
		alert('friendRequest in userController')
		console.log('friendrequest function')
		UserService.friendRequest(username).then(function(response) {
			console.log(response.status);
			alert('Friend request Send')
			getAllUsers();
			$location.path('/getAllUsers')
		}, function(response) {
			console.log(response.status);
		})
	}

	function getAllUsers() {
		console.log('entering get all users ')
		UserService.getAllUsers().then(function(response) {
			console.log(response.status)
			console.log(response.data)
			$scope.friends1 = response.data
			$scope.count = $scope.users.length;
		}, function(response) {
			console.log(response.status)
		})
	}
	getAllUsers()

})

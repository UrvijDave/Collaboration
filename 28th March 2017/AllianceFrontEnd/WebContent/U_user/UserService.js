app.factory('UserService', function($http) {
	var userService = this;
	var BASE_URL = "http://localhost:8088/AllianceBackEnd/"

	userService.authenticate = function(user) {
		return $http.post(BASE_URL + "/login", user);
	};

	userService.logout=function(){
		console.log('entering logout service')
		return $http.put(BASE_URL + "/logout")
	};
	
	userService.registerUser = function(user) {
		return $http.post(BASE_URL + "/register", user)
	};

	userService.fetchAllUsers = function() {
		console.log('entering fetchall users in user service')

		return $http.get(BASE_URL + "/users").then(function(response) {

			console.log(response.data)
			console.log(response.status)
			return response.data

		}, function(response) {
			console.log(response.data)
			return response.data
		})
	};

	userService.getUser = function(id) {
		return $http.get(BASE_URL + "/users/" + id)
	};

	userService.updateUser = function(userid, user) {
		console.log('update user in service')
		console.log('user id ' + userid)
		return $http.put(BASE_URL + "/users/" + userid, user);
	};
	
	userService.getUserById = function(userid, user) {
		console.log('update user in service')
		console.log('user id ' + userid)
		return $http.get(BASE_URL + "/users/{id}" + userid, user);
	};
	
	
		
	userService.getAllUsers=function(){
		console.log('entering getallusers in user service')
		return $http.get(BASE_URL +"/getUsers")
	};
	
	userService.friendRequest=function(username){
		console.log('service --- friendRequest');
		return $http.post(BASE_URL+ '/friendRequest',username);
	};

	userService.deleteUser=function(id){
		console.log("entering delete user in service with id " + id);
		return $http.delete(BASE_URL + "/users/"+id)
		.then(function(response){
			console.log(response.status)
			return response.status;
		},function(response){
			console.log(response.status)
			})
	};
	return userService;
})

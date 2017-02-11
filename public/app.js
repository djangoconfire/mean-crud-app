
var app=angular.module('app',['ngRoute'])

app.controller('HomeController',function($http){
	var vm=this;

	vm.users=[];
	vm.detaileduser;

	vm.title="welcome to home controller";

	vm.showdetail=function(user){
		vm.detaileduser=user;
		vm.detailed=true;
	}

	vm.getUsers=function(){
		$http.get('/api/users').then(function(response){
			vm.users=response.data;
		})
	}

	vm.getUsers();

	vm.removeUser=function(user){
		console.log(user);
		if(user){
			$http.delete('/api/users/' + user._id).then(function(response){
			vm.getUsers();
			
			})
		}
	
	}

	vm.updateUser=function(user){
		console.log(user);
		if(user){
			$http.put('/api/users/', user).then(function(response){
			vm.getUsers();
			
			})
		}
	
	}


	vm.addUser=function(user){
		if(user && user.name && user.age){
			console.log('about.create user')

			$http.post('/api/users',user).then(function(response){
				vm.getUsers();
				vm.user="";
				vm.adduser=false;
			})
		}else{
			console.log('You have to supply enough details')
		}
	}


})

app.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: './home.html',
		controller:  'HomeController',
		controllerAs : 'vm'
	}).
	otherwise('/')
})
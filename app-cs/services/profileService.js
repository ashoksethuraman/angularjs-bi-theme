angular.module('business-insights').factory('profileService', ['$localStorage','$q', '$http', function($localStorage, $q, $http) {

 return ({
  		getUserProfile : getUserProfile,
  		updateProfilePlugin : updateProfilePlugin,
  		usergetAll : usergetAll,
  		updateUserBillingPlans :updateUserBillingPlans

  		});





//from manage user controller
function updateUserBillingPlans(plans) {
		var deferred = $q.defer();
		$http.post($localStorage.baseURL+'/api/business-insights/v1/userplan/updates', plans,{
			headers :{
				'Authorization':$localStorage.accessToken
			}
		}).success(function(data, status) {
			console.log(data, status)
			if (status === 200) {
				// var data = data.data;
				deferred.resolve(data);
			} else if (status === 404) {
				deferred.resolve(data);
			}
		}).error(function(data) {			
			deferred.reject(data);
		});
		return deferred.promise;

	}


function usergetAll(plugin) {
		var deferred = $q.defer();
		console.log('userlist' ,$localStorage.accessToken);
		$http.get($localStorage.baseURL+'/api/business-insights/v1/userlist',{
			headers: {
				'Authorization':$localStorage.accessToken
			}
		}).success(function(data, status) {
			console.log(data, status)
			if (status === 200) {
				deferred.resolve(data);
			} else if (status === 404) {
				deferred.resolve(data);
			}
		}).error(function(data) {			
			deferred.reject(data);
		});
		return deferred.promise;

	}








function updateProfilePlugin(plugin) {
		var deferred = $q.defer();
		$http.post($localStorage.baseURL+'/api/business-insights/v1/credentials', plugin,{
			headers :{
				'Authorization':localStorage.accessToken
			}
		}).success(function(data, status) {
			console.log(data, status)
			if (status === 200) {
				// var data = data.data;
				deferred.resolve(data);
			} else if (status === 404) {
				deferred.resolve(data);
			}
		}).error(function(data) {			
			deferred.reject(data);
		});
		return deferred.promise;

	}


 function getUserProfile(userId, accessToken) {
		var deferred = $q.defer();
		console.log(userId, accessToken)
		$http.get($localStorage.baseURL+'/api/business-insights/v1/user/' + userId,{
			 headers: {
                    'Authorization': accessToken
                }
		}).success(function(data, status) {
			console.log(data, status)
			if (status === 200) {
				// var data = data.data;
				deferred.resolve(data);
			} else if (status === 404) {
				deferred.resolve(data);
			}
		}).error(function(data) {
			deferred.reject(data);
		});
		return deferred.promise;

	}











}]);

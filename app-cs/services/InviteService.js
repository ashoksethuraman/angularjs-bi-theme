angular.module('business-insights').factory('inviteService', ['$q','$http', function($q, $http){



return ({
	UserInvite : UserInvite

 });

 

function UserInvite(inviteData) {
		var deferred = $q.defer();
		console.log(inviteData);
		$http.post('http://business-insights.local/api/business-insights/v1/invite', inviteData, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
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



}]);
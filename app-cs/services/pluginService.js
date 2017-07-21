angular.module('business-insights').factory('pluginService', ['$q','$http', '$localStorage', function($q, $http, $localStorage){


return ({
	    alertMessage  : alertMessage,
		getPlugin : getPlugin

     });


 function getPlugin(accessToken) {	
    console.log(accessToken,'accessToken');
    var deferred = $q.defer();   
    $http.get($localStorage.baseURL+'/api/business-insights/v1/plugins',{
    	headers: {
                'Authorization': accessToken
            }
    }).success(function(data, status) {
    	    console.log('Resulsts',status, data)
    	    data.status =  status;
			if (status === 200) {
				deferred.resolve(data);
			} else {
				deferred.resolve(data);
			}
		}).error(function(data) {
				deferred.resolve(data);

			});
			return deferred.promise;
		}






	function alertMessage (message, type, $alert){
		    console.log('alert message :::',message, type, $alert)
			var alertMessage = 'Sorry something went wrong, Please try again later';
			var hint =  '<br> Hint: '; 
			animation = 'am-fade-and-scale';
			return function(){$alert({title: type, 
				content: (type=='error')? ((message)? (alertMessage + hint + message):alertMessage):message,
				 placement: 'top-right', type: type, animation: animation, keyboard: true, duration:4});}();
		} 

}]);
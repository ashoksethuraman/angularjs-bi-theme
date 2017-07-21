angular.module('business-insights').controller('managePluginCtl', ['$localStorage', '$state', '$scope','$http', 'managePluginService', 'ngDialog', '$alert', function($localStorage, $state, $scope, $http, managePluginService, ngDialog, $alert){
 

if($localStorage.accessToken){ }else{$state.go('sign');}

$scope.itemsPerPage = 5;


$scope.getData = function(){
	// getPluginDetails();
}

getPluginDetails()
function getPluginDetails(){
	managePluginService.getPlugin($localStorage.accessToken).then(function(data){
		$scope.pluginDetails = data;
	}).catch(function(data) { });


 };









 }]);
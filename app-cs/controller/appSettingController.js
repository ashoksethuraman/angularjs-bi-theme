angular.module('business-insights').controller('settingsCtl', ['$localStorage', '$state','$scope','$http', 'settingService', 'ngDialog', function($localStorage, $state, $scope, $http, ngDialog){
 
 if($localStorage.accessToken){ }else{$state.go('sign');}

 }]);
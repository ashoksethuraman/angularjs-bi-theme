angular.module('business-insights').controller('profileCtl', ['$localStorage', '$state',  '$scope', '$http', 'profileService', 'ngDialog', '$stateParams', '$alert', function($localStorage, $state, $scope, $http, profileService, ngDialog, $stateParams,  $alert) {
$scope.currentTab = 1;

if($localStorage.accessToken){ }else{$state.go('sign');}

$scope.userId = $localStorage.data.user_id;
$scope.userName = $localStorage.username;

getProfiles();
function getProfiles(){    
         profileService.getUserProfile($scope.userId, $localStorage.accessToken).then(function(userDetails){
                $scope.userProfile = userDetails;
                console.log( $scope.userProfile);
            });

}
  $scope.finalJson = {};
 $scope.finalJson.credentials = [{
                key: "",
                value: "",
                index: 1
             }];

 $scope.popovers = function(data){ 
           console.log(data);
           var removejson = data.pluginCredentials;
            removejson = removejson.substr(0, index) + "[" + removejson.substr(index + 1);
            removejson = removejson.substr(0, removejson.length-1) + "]";            
            var array = JSON.parse(removejson.toString());
            // console.log('Arrays:',array)           
           $scope.finalJson.credentials = data.pluginCredentials
           ngDialog.openConfirm({
            template : 'ProfileUpdate',
            className : 'ngdialog-theme-default',
            scope : $scope
        }).then(function(template_name) {
            data.plugincredential =  true;   
            data.userId = $scope.userId ;
             profileService.updateProfilePlugin(data).then(function(pluginDetails){
                console.log(pluginDetails);

            });
         
        });


           
  }

  // $scope.updatePluginDetails = function(data){
  //   console.log(data, $scope.finalJson.credentials);
  //   $scope.pluginUpdate.credentials =[{"key":"senztamil","index":1,"value":"mayiladurai"},{"key":"arakonam","value":"francis"}];
  //   $scope.pluginUpdate.userId = $scope.userId ;
  //   console.log('changed credentials',$scope.pluginUpdate);
  //    profileService.updateProfilePlugin($scope.pluginUpdate).then(function(pluginDetails){
  //               console.log(pluginDetails);

  //           });


    // };


$scope.addCredentials = function(insertDetails) {
        $scope.finalJson[insertDetails].push({});
    }
     $scope.removecredentials = function(credentials, index) {
        $scope.finalJson[credentials].splice(index, 1);

    }




}]);
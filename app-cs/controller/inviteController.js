angular.module('business-insights').controller('inviteController', ['$localStorage', '$state', '$scope','$http', 'inviteService', 'ngDialog', function($localStorage, $state, $scope, $http, inviteService, ngDialog){
 

// if($localStorage.accessToken){ }else{ $state.go('sign');}

console.log("sfdjjjjjjjjjjjjjjjjjjjjjjjjjhfkjdfh");
$scope.userId = "07e6d3e2-153f-11e7-872e-1c3e841ec9f3";


$scope.userBulkInvite = function(file){

  var fd = new FormData();
  fd.append('file',file);
  fd.append('userId', $scope.userId)
  var Indata = {fd, 'userId': $scope.userId };
    console.log(Indata);
  $http.post('http://business-insights.local/api/business-insights/v1/invite', fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).success(function(data, status) { 
         console.log('succss upload', status, data);
         data.userId = $scope.userId;
            var dataInJson = JSON.stringify(data);
            console.log(dataInJson);
            if (status === 200) {
                $http.post('http://business-insights.local/api/business-insights/v1/invite/list', dataInJson, {
                    headers: {
                        'action': 'extract'
                    }
                }).success(function(ExtractData, Exstatus) {
                  console.log('ExtractData values', ExtractData, Exstatus);

                });

            } else {
                console.log('File not  upload in local modeuls');
            }




        });
        

 
};






 }]);
angular.module('business-insights').controller('pluginController', ['$localStorage', '$state', '$scope', '$http', 'pluginService', 'ngDialog', 'Upload', '$alert', function($localStorage, $state, $scope, $http, pluginService, ngDialog, Upload, $alert) {

// if($localStorage.accessToken){ }else{$state.go('sign');}
  

$scope.userId = $localStorage.data.user_id; 
$scope.itemsPerPage = 5;

   $scope.disable = false;
    $scope.doSomething = function(insertDetails) {
        $scope.finalJson[insertDetails].push({});
    }

    $scope.removeIcon = false;
    $scope.addOnecolumn = function(oneColumn) {
        $scope.plugin.details[oneColumn].questions.push({});
        $scope.removeIcon = true;
    }

    $scope.removeColumn = function(remove, index) {
        $scope.plugin.details[remove].questions.splice(index, 1);
    }


    $scope.add_intent = function(addIntent) {
        $scope.plugin[addIntent].push({
            intent: "",
            questions: [{}]
        });
    }


    $scope.delete_intent = function(deleteIntent, index) {
        $scope.plugin[deleteIntent].splice(index, 1);
    }

    $scope.removecredentials = function(credentials, index) {
        $scope.finalJson[credentials].splice(index, 1);

    }


    $scope.plugin = {
        details: [{
            intent: "",
            questions: [{}],
            index: 1
        }]
    };

    $scope.finalJson = {};
    $scope.finalJson.credentials = [{
        key: "",
        value: "",
        index: 1
    }];

    $scope.cloneRow = function(insertDetails) {
        $scope.finalJson[insertDetails].push({});
    };
    $scope.removeRow = function(deletetDetails, index) {
        $scope.finalJson[deletetDetails].splice(index, 1);
    };


    $scope.disabling  = function(){
        $scope.disable =  false;
    }

    $scope.uploadinginNext = function(file) {
        console.log(file, file == null);
        var fd = new FormData()
        fd.append('file', file);
        $scope.isLoad = true;  
        if(file != null &&  $scope.plugins.code != null){
            $scope.disable = true;
            $http.post($localStorage.baseURL+'/api/business-insights/v1/uploads', fd, {
                transformRequest: angular.identity,
                 headers: {
                        'Content-Type': undefined,
                        'Authorization': $localStorage.accessToken
                    }           
            }).success(function(data, status) {
                $scope.disable = true;
                
                data.userId = $scope.userId;
                data.code = $scope.plugins.code;
                var dataInJson = JSON.stringify(data);
                console.log('dataInJson:::',dataInJson);
                if (status === 200) {
                    $http.post($localStorage.baseURL+'/api/business-insights/v1/uploads/s3', dataInJson, {
                        headers: {
                            'Authorization': $localStorage.accessToken
                        }
                    }).success(function(s3data, s3status) {
                        if(s3status == 200){
                            $scope.isLoad = false;
                            pluginService.alertMessage('Plugin uploaded sucessfully','success',$alert)
                        }
                        else{
                            $scope.isLoad = false;
                            pluginService.alertMessage('Plugin upload fail','error',$alert);
                        }
                    }).error(function(error){
                         $scope.isLoad = false; 
                        pluginService.alertMessage(error.message,'error',$alert);

                    });
                } else {
                     $scope.isLoad = false;  
                    pluginService.alertMessage('Plugin upload fail','error',$alert);
                }
            }).error(function(err){
                pluginService.alertMessage(err.message,'error',$alert);
                // console.log('mains errors',err);
            });
        }else{
             $scope.isLoad = false;  
            pluginService.alertMessage('Please upload plugin details','error',$alert)
        }
}






getPluginDetails()
function getPluginDetails(){
    pluginService.getPlugin($localStorage.accessToken).then(function(data){
        $scope.pluginDetails = data;
    }).catch(function(data) { });


 };


}]);
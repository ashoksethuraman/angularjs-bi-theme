angular.module('business-insights').controller('developerController', ['$alert', '$state', '$localStorage', '$window', '$timeout', '$rootScope', 'ngDialog', '$scope', '$location', '$http', 'commonService', 'developerService',
    function($alert, $state, $localStorage, $window, $timeout, $rootScope, ngDialog, $scope, $location, $http, commonService,developerService) {



$scope.isTab2 = false;
$scope.userId = $localStorage.data.user_id;


$scope.onClickTab = function(state) {
        $scope.currentTab = state;
         $scope.pageno = 1;
        $scope.getData($scope.pageno);
       
    };
    
    $scope.getData = function(currentPage) {

        switch ($scope.currentTab) {
        case 1 :
            $scope.isTab2 = false;
            $scope.developersList('requested');
            break;
        case 2 :
            $scope.isTab2 = true;
            PluginRequestedList('approved');
            break;
        case 3 : 
           developersList('requested');
           break;
                 
        }
    };

$scope.developersList = function(status){
      console.log(status);
	 developerService.developersList(status).then(function(developerData) {
          $scope.developer = developerData.developers;
          console.log($scope.developer);
            });
   }



function PluginRequestedList(status){
    developerService.developerPluginList(status).then(function(devplugdata){        
        $scope.developerPluginList = devplugdata.plugins;
        console.log($scope.developerPluginList);
    });
}




$scope.developerUpdates = function(deveData, actionStatus, title) {
	        
             $scope.title = title;
	         $scope.action = actionStatus;
              console.log('actionStatus::', actionStatus, title)
            ngDialog.openConfirm({
                template: 'developeractions',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(template_name) {
            	if (actionStatus == "approved") {
            		    developerKeyUpdate(deveData, actionStatus);
                }      
                else if(actionStatus == "rejected"){
                	  developerKeyUpdate(deveData, actionStatus);
                }                     
            });
        }




$scope.developerpluginAction = function(deveData, actionStatus, title) {
            $scope.action = actionStatus;
            $scope.title = title;
            ngDialog.openConfirm({
                template: 'developeractions',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(template_name) {
                if (actionStatus == "approved") {
                        developerpluginApprove(deveData, actionStatus);
                }      
                else if(actionStatus == "rejected"){
                      developerpluginRejected(deveData, actionStatus);
                }                     
            });
        }


   function developerpluginApprove(deveData, actionStatus){        
         console.log('deve data:::', deveData);
         var pluginApproved  = {};
         pluginApproved.id = deveData.id;
         $scope.isLoad = true;
         pluginApproved.status = actionStatus;
         pluginApproved.location = deveData.location ;
         pluginApproved.fileName = deveData.location+deveData.file_name; 
         pluginApproved.plugin_code = deveData.plugin_code 
         pluginApproved.userId = $scope.userId ;        
         console.log(pluginApproved);  
       developerService.pluginApproveS3(pluginApproved).then(function(approved){
            $scope.isLoad = false;
            if(approved.status == 200){
               commonService.alertMessage('Plugin rejected successfully', 'success', $alert);
            }else{
                commonService.alertMessage('Plugin rejected failed', 'error', $alert);
            }
       });
   }



      function developerpluginRejected(devdata, actionstatus){
        var pluginRejected = {};
        pluginRejected.id = devdata.id;
        pluginRejected.plugin_code = devdata.plugin_code
        pluginRejected.status = actionstatus;
        console.log(pluginRejected);
        developerService.pluginRejected(pluginRejected).then(function(rejected){
            console.log(rejected);
            if(rejected.status == 200){
               commonService.alertMessage('Plugin rejected successfully', 'success', $alert);
            }else{
                commonService.alertMessage('Plugin rejected failed', 'error', $alert);
            }

        })
     }






function developerKeyUpdate(deveData, actionStat){
             var keystatus  = {};
             keystatus.id = deveData.id;
             $scope.isLoad = true;
             keystatus.status = actionStat;
             // keystatus.userId = $scope.userId;
             // var n = deveData.plugin_location.lastIndexOf('/');
             // keystatus.location = deveData.plugin_location.substring(0, n != -1 ? n : deveData.plugin_location.length) + "/";
             // // keystatus.fileName = deveData.plugin_location.substring(deveData.plugin_location.lastIndexOf("/") + 1);
             // keystatus.fileName = deveData.plugin_location;
             // console.log('sssssss',keystatus);
	         developerService.keyStatusUpdate(keystatus).then(function(devreturn){
             $scope.isLoad = false;
	         	console.log(devreturn);

	         });



}






}]);

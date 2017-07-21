angular.module('business-insights').controller('listTaskController', ['$localStorage', '$state', '$scope', '$http', 'ngDialog', '$stateParams', '$alert', 'pluginService', 'commonService', 'taskService', function($localStorage, $state, $scope, $http, ngDialog, $stateParams, $alert, pluginService, commonService, taskService) {







      $scope.task = {};
      $scope.model = [];

checkUrl();
    function checkUrl() {
       console.log($stateParams);
       if ($stateParams.view_edit == undefined || $stateParams.view_edit == "view" || $stateParams.view_edit == "edit" || $stateParams.view_edit == "create") {
            if ($stateParams.view_edit == "view") {
                $scope.id = $stateParams.id;
                $scope.stateParams = $stateParams
                $scope.isView = true;
                $scope.isSave = false;
                $scope.isEdit = false;
                $scope.task = {};
                viewTask($scope.id);
            } else if ($stateParams.view_edit == "edit") {
                $scope.id = $stateParams.id;
                $scope.isView = false;
                $scope.isSave = false;
                $scope.stateParams = $stateParams;
                $scope.isEdit = true;
                $scope.action = "Edit";
                $scope.task = {};
                editTask($scope.id);
            } else if ($stateParams.create == "create") {
                var date = new Date();
                $scope.isView = false;
                $scope.isSave = true;
                $scope.stateParams = $stateParams;
                $scope.isEdit = false;
                $scope.action = "Create";
                $scope.task = {};
            } else {
                $scope.task = {};
                $scope.pageno = 1; // initialize page no to 1
                $scope.total_count = 0;
                $scope.itemsPerPage = 10;  
                $scope.model.push({
                            title: 'Set up this step',
                            index: 1,
                            active: true,
                            subitems: ['Choose Plugin', 'Choose Intent', 'Setup Template']
                        });
            }
        } else {
            $state.go("/login");
        }
    };


  

  

function viewTask(taskID){
        console.log(taskID);
        taskService.getTaskWithItem(taskID).then(function(taskItem){
            console.log(JSON.stringify(taskItem));
            $scope.task.name =  taskItem.name;
            $scope.task.intent = taskItem.intent;
            $scope.task.description = taskItem.description;
            angular.forEach(taskItem.childObjects, function(modelsItem){
                $scope.model.push({
                    title : modelsItem.name,
                    index : modelsItem.sequence,
                    subitems: ['Choose Plugin', 'Choose Action', 'Setup Template']

                });
                var service = {};
                 service.pluginId = modelsItem.plugin_id;
                 service.fromName = "methodTemplates";
                 
                console.log(modelsItem.query_template.fillter);
                if(modelsItem.sequence == 1){

                }
                angular.forEach(modelsItem.query_template.fillter, function(itemFilter){
                     
                });
            });
        });
 
}






$scope.listTask = function(){
    taskService.listTasks().then(function(listTask){
        console.log(listTask);
        $scope.taskList = listTask;
    });
}


$scope.popup = function(task, action) {
        ngDialog.openConfirm({
            template: 'delete',
            className: 'ngdialog-theme-default',
            scope: $scope
        }).then(function(template) {
            if(action == 'delete'){ deleteTask(task); }
            else if(action == 'view') { }
        });
    }



function deleteTask(task){
    console.log(task.id);
    taskService.deleteTask(task.id).then(function(deleteTask){
            console.log('deleting Task', deleteTask);
            listTask();
        });
}  




  




}]);
angular.module('business-insights').controller('billingController', ['$localStorage', '$state', '$scope', '$http', 'billingService', 'ngDialog', '$stateParams', 'pluginService', 'commonService', '$alert', 'taskService', function($localStorage, $state, $scope, $http, billingService, ngDialog, $stateParams, pluginService, commonService, $alert, taskService) {

    // if ($localStorage.accessToken) {} else {
    //     $state.go('sign');
    // }


  
    $scope.itemsPerPage = 6;
    $scope.total_count = 12;
    $scope.indexTracker = [];
    $scope.pluginselected = [];
    $scope.adminRole = $localStorage.userRole;
    checkUrl();
    function checkUrl() {
        if ($stateParams.view_edit == undefined || $stateParams.view_edit == "view" || $stateParams.view_edit == "edit" || $stateParams.view_edit == "create") {
            if ($stateParams.view_edit == "view") {
                $scope.id = $stateParams.id;
                $scope.stateParams = $stateParams
                $scope.isView = true;
                $scope.isSave = false;
                $scope.isEdit = false;
                $scope.billing = {};
            } else if ($stateParams.view_edit == "edit") {
                $scope.id = $stateParams.id;
                $scope.isView = false;
                $scope.isSave = false;
                $scope.stateParams = $stateParams;
                $scope.isEdit = true;
                $scope.action = "Edit";
                $scope.billing = {};
                editBilling($scope.id);
            } else if ($stateParams.create == "create") {
                var date = new Date();
                $scope.isView = false;
                $scope.isSave = true;
                $scope.stateParams = $stateParams;
                $scope.isEdit = false;
                $scope.action = "Create";
                $scope.billing = {};
            } else {
                $scope.billing = {};
                $scope.pageno = 1; // initialize page no to 1
                $scope.total_count = 0;
                $scope.itemsPerPage = 10;
            }
        } else {
            $state.go("/login");
        }
    };

  
    $scope.getBillings = function() {
        if($localStorage.roles.Admin){
            billingService.getAllBillings($localStorage.accessToken).then(function(allBillings) {
            if (allBillings.status == 200) {
                $scope.billingList = allBillings;
                console.log($scope.billingList);
            } else {
                commonService.alertMessage('Api failed to load', 'error', $alert);
            }
        }).catch(function(err) {
            console.log('err', err);
        });

        }
        
    };


    var vm = this;
    console.log(vm);
    vm.isSubmitted = false;
    $scope.validateInput = function(name, type) {
        if (vm.formValidate) {
            var input = vm.formValidate[name];
            return (input.$valid || vm.isSubmitted) && input.$error[type];
        }
    };

    var vm = this;
    $scope.validateForClass = function(name, modelValue) {
        var str = '';
        if (vm.formValidate && vm.formValidate[name]) {
            var input = vm.formValidate[name];
            modelValue = modelValue ? modelValue + "" : modelValue;
            if (modelValue == " " || modelValue == " ") {
                modelValue = ""
            }
            // console.log(input.$valid, modelValue, modelValue.length > 0)
            str += (input.$valid && modelValue && (modelValue.length > 0)) ? 'has-success' : (input.$invalid || !modelValue) ? ' ' : '';
           // console.log(str)
            return str;
        }
    };

    function editBilling(id) {
        billingService.getIdBillings(id, $localStorage.accessToken).then(function(idBillings) {
            $scope.billing = idBillings;            
            console.log($scope.billing);     
        }).catch(function(err) {
            console.log('err', err);
        });
    }

    var billingperiods = ['Hour', 'Month', 'Year'];
    $scope.billingperiods = [];
    for (var key in billingperiods) {
        $scope.billingperiods.push({"name": billingperiods[key]});
    }


   $scope.getTaskList = function(){

           if (vm.formValidate.$valid) {
                vm.isSubmitted = false;
                    taskService.listTasks().then(function(listTasks){
                         console.log(listTasks);
                         if (listTasks.status == 200) { 
                             $scope.tasks = listTasks.tasks;

                         }else{
                             commonService.alertMessage('Failed', 'error', $alert)
                         }


                    }); 

           }else {
             console.log('not valid');
             vm.isSubmitted = true;
        }  
   }
    
  
    // $scope.getPluginsList = function() {
    //     if (vm.formValidate.$valid) {
    //         vm.isSubmitted = false;
    //         pluginService.getPlugin($localStorage.accessToken).then(function(pluginData) {
    //             if (pluginData.status == 200) {
    //                 $scope.pluginList = pluginData;
    //                 angular.forEach($scope.pluginList.plugins, function(value, key) {
    //                     var exists = false;
    //                     angular.forEach($scope.billing.pluginjson, function(val2, key) {
    //                         if (angular.equals(value.id, val2.pluginId)) {
    //                             exists = true;
    //                             value.class = true;
    //                             $scope.pluginselected.push(value);
    //                         };
    //                     });                        
    //                 });
    //             } else {
    //                  commonService.alertMessage('Failed', 'error', $alert)
    //             }

    //         }).catch(function(err) {
    //             console.log(err)
    //         })
    //     } else {
    //         console.log('not valid');
    //         vm.isSubmitted = true;
    //     }

    // }





    $scope.modelopens = function(taskIndivitual){
         if(taskIndivitual.class == true){
             taskIndivitual.class  = false;
         }else{
            taskIndivitual.class  = true;
         }
         taskService.getTaskWithItem("3b74024d-9644-49f0-b70c-2fa3e52592d7").then(function(taskItem){           
            $scope.taskItems = taskItem;
            $scope.taskItem;
            console.log($scope.taskItems);
            $('.modal').modal('show');
        });

   
   
  }





    $scope.popup = function() {
        ngDialog.openConfirm({
            template: 'cancel',
            className: 'ngdialog-theme-default',
            scope: $scope
        }).then(function(template) {
            console.log('after yes');
        });
    }







    $scope.selectedPlugin = function(data) {
         console.log(data);
        if (data.class) {
            data.class = false;
            $scope.pluginselected.push(data);
        } else {
            data.class = true;
            $scope.pluginselected.push(data);
        }
        var newArr = [];
        var elseArr = [];
        angular.forEach($scope.pluginselected, function(value, key) {
            var exists = false;
            angular.forEach(newArr, function(val2, key) {
                if (angular.equals(value.id, val2.id)) {
                    exists = true;
                    angular.forEach(newArr, function(duplicates) {
                        if (value.id == duplicates.id) {
                            var index = newArr.indexOf(duplicates);
                            newArr.splice(index, 1);
                        }
                    });
                };
            });
            if (exists == false && value.id != "") {
                newArr.push(value);
                 $('.modal').modal('hide');
            }
        });
        $scope.pluginselected = newArr;
        console.log('pluginselected ::', $scope.pluginselected);
    }










    $scope.createBilling = function(billing, selectedPlugin) {
        var pluginLists = [];
        $scope.isLoad = true;
        angular.forEach(selectedPlugin, function(selectedValue) {
            pluginLists.push({
                "id": selectedValue.id
            });
        });
        $scope.billing.units = $scope.billing.units;
        billing.pluginList = pluginLists;
        billing.units = $scope.billing.units;
        console.log($scope.billing.units);
        console.log(billing);
        billingService.billingDetails(billing, $localStorage.accessToken).then(function(createStatus) {
            console.log(createStatus);
            if (createStatus.status == 201) {
                $scope.isLoad = false;
                commonService.alertMessage('Billing creataed sucessfully', 'success', $alert)
                $state.go('billingList');
            } else {
                commonService.alertMessage('Billing created failed', 'error', $alert)
                $scope.isLoad = false;
            }
        }).catch(function(err) {
            console.log("error", err)
        });


    }










}]);
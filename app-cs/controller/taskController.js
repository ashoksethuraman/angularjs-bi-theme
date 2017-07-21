angular.module('business-insights').controller('taskController', ['$localStorage', '$state', '$scope', '$http', 'ngDialog', '$stateParams', '$alert', 'pluginService', 'commonService', 'taskService', function($localStorage, $state, $scope, $http, ngDialog, $stateParams, $alert, pluginService, commonService, taskService) {


    $scope.taskitemID = [];
    $scope.closeListIndex = [];
    $scope.itemListIndex;
    $scope.taskItemsInputOutput;
    $scope.pluginselected = [];
    $scope.model = [];
    $scope.firstStep = true;
    $scope.secondstep = false;
    $scope.itemIndex = 1;
    $scope.itemIndexArray = [1];
    $scope.setUpIndex = null;
    $scope.ouputInput = [];
    $scope.autoLoad = false;
    $scope.autoAddIndex = 1;
    $scope.responsestep = false;
    // $scope.itemIndexArray.push($scope.itemIndex);
    $scope.itemNext = 0;
    $scope.itemAnotherIndex = 1;

    $scope.enableReadonly = true;
    $scope.colorStepReadonly = "changetolabel";

    $scope.itemsPerPage = 6;
    $scope.filterFields = [];
    $scope.filterselected = [];
    $scope.selectedFields = [];
    $scope.feildIndex;
    $scope.intentOption = false;
    $scope.intentsHover = false;
    $scope.selectedTags = false;
    $scope.responseFieldSummary = false;
    $scope.fieldsSummary = false;
    $scope.taskHeaderstep = true;



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
                    save: false,
                    subitems: ['Choose Plugin', 'Choose Action', 'Setup Template']
                });
            }
        } else {
            $state.go("/login");
        }
    };




    $scope.checkMenu = function(index, mainindex) {
        if ($scope.setUpIndex && $scope.setUpIndex.sub + 1 >= index) {
            // console.log($scope.setUpIndex.sub+1 , index)
        }
        if ($scope.setUpIndex != null && $scope.setUpIndex.main == mainindex && $scope.setUpIndex.sub + 1 >= index) {

            return false;

        } else if (index == 0) {
            return false;
        } else {
            return true
        }


    }




    function Allplugins(index) {
        pluginService.getPlugin($localStorage.accessToken).then(function(pluginData) {
            $scope.Allplugin = pluginData;
            $scope.Allplugin.index = index;
            $scope.secondstep = false;
            $scope.firstStep = true;
        });
    }



    $scope.listOfplugins = function(item, index, modelIndex) {
        item.class = false;
        console.log(item, index, modelIndex);
        $scope.activeMenu = item;
        $scope.itemIndex = modelIndex;
        $scope.itemAnotherIndex = modelIndex;
        if (index == 0) {
            $scope.secondstep = false;
            $scope.intentsHover = false;
            $scope.selectedTags = false;
            $scope.responseFieldSummary = false;
            $scope.fieldsSummary = false;
            $scope.thirdstep = false;
            $scope.taskHeaderstep = false;
            $scope.responsestep = false;
            Allplugins({
                main: modelIndex,
                sub: index
            });
            if ($scope.model.length >= 1) {

            }
        } else if (index == 1) {
            $scope.secondstep = true;
            $scope.firstStep = false;
            $scope.intentsHover = false;
            $scope.selectedTags = false;
            $scope.responseFieldSummary = false;
            $scope.fieldsSummary = false;
            $scope.thirdstep = false;
            $scope.taskHeaderstep = false;
            $scope.responsestep = false;
        } else if (index == 2) {
            $scope.firstStep = false;
            $scope.secondstep = false;
            $scope.intentsHover = false;
            $scope.selectedTags = false;
            $scope.responseFieldSummary = false;
            $scope.fieldsSummary = false;
            $scope.thirdstep = true;
            $scope.selectedTags = true;
            $scope.taskHeaderstep = false;
            $scope.responsestep = false;
            // console.log($scope.model, $scope.itemIndex);
            // console.log($scope.model[$scope.itemIndex - 1].fields, $scope.model[$scope.itemIndex - 1].selectedFilter.length);
            if ($scope.model[$scope.itemIndex - 1].fields.length >= 1) {
                $scope.fieldsSummary = true;
            }
            if ($scope.model[$scope.itemIndex - 1].selectedFilter.length >= 1) {
                $scope.responseFieldSummary = true;
            }
        }
    }



    function viewTask(taskID) {
        $scope.isLoad = true;
        $scope.ouputInput = [];
        taskService.getTaskWithItem(taskID).then(function(taskItem) {
            console.log(JSON.stringify(taskItem));
            $scope.taskId = taskItem.id;
            $scope.task.name = taskItem.name;
            $scope.task.intent = taskItem.intent;
            $scope.task.description = taskItem.description;
            angular.forEach(taskItem.childObjects, function(modelsItem) {
                $scope.model.push({
                    title: modelsItem.name,
                    index: modelsItem.sequence,
                    subitems: ['Choose Plugin', 'Choose Action', 'Setup Template']
                });
                $scope.model[modelsItem.sequence-1].plugin_id = modelsItem.plugin_id;
                $scope.model[modelsItem.sequence-1].id = modelsItem.id;
                 // viewAssignTask(taskItem.childObjects);

                 var service = {};
                service.pluginId = modelsItem.plugin_id;
                service.fromName = "methodTemplates";
                var joinIntents = [];
                var templates = {};
               commonService.pluginCredential(service).then(function(pluginConfig) {
                    console.log(JSON.stringify(pluginConfig));
                    // console,log()
                    angular.forEach(pluginConfig.templates.GetOrders.intents, function(iteratedIntents) {
                        joinIntents.push(iteratedIntents);
                    });
                    angular.forEach(pluginConfig.templates.GetInvoice.intents, function(iteratedInvoiceIntetents) {
                        joinIntents.push(iteratedInvoiceIntetents);
                    });
                    $scope.configuration = pluginConfig;                    
                    $scope.filterTemplates = {};
                    $scope.radioIntents = modelsItem.query_template.intentName;
                    $scope.model[modelsItem.sequence - 1].selectedIntent = modelsItem.query_template.intentName;
                    angular.forEach($scope.configuration.templates.GetOrders.intents, function(iteratedIntents) {
                        if (angular.equals($scope.radioIntents, iteratedIntents)) {
                            $scope.filterTemplates = $scope.configuration.templates.GetOrders;
                        }
                    });
                    angular.forEach($scope.configuration.templates.GetInvoice.intents, function(iteratedInvoiceIntetents) {
                        if (angular.equals($scope.radioIntents, iteratedInvoiceIntetents)) {
                            $scope.filterTemplates = $scope.configuration.templates.GetInvoice;
                        }
                    });
                    $scope.model[modelsItem.sequence - 1].filterTemplates = $scope.filterTemplates;
                    $scope.model[modelsItem.sequence - 1].intents = joinIntents;
                });

                if (modelsItem.sequence == 1) {
                    $scope.model[modelsItem.sequence - 1].selectedFilter = modelsItem.query_template.filter;
                    $scope.model[modelsItem.sequence - 1].fields = modelsItem.query_template.responseFields;
                    // console.log($scope.model);
                } else {
                    var actualArray = [];
                    $scope.model[modelsItem.sequence - 1].selectedFilter = modelsItem.query_template.filter;
                    $scope.model[modelsItem.sequence - 1].fields = modelsItem.query_template.responseFields;
                    angular.forEach(modelsItem.query_template.filter, function(itemFilter) {
                        var separators = ['@@'];
                        var tokens = itemFilter.actualValue.split(new RegExp(separators.join('|'), 'g'));
                        tokens.forEach(function(elements) {
                            if (elements.split('__')[1] == undefined) {
                                actualArray.push({
                                    'name': elements.split('__')[0]
                                })
                            } else {
                                actualArray.push({
                                    'id': elements.split('__')[0],
                                    'name': elements.split('__')[1]
                                })
                            }
                        });
                        itemFilter.actualValue = actualArray;
                    });
                }

            });
            $scope.isLoad = false;
            if($scope.model.length > 0){
                     taskplusItem($scope.taskId);
            }

            
        });
        

    }


function  viewAssignTask(childObjects){ 
        var service = {};
        var loopPromises = [];
         var cntr = 0;
       
    }




    $scope.addMenu = function() {
        $scope.model.push({
            title: 'Set up this step',
            index: $scope.model.length + 1,
            active: false,
            subitems: ['Choose Plugin', 'Choose Action', 'Setup Template']
        });
        $scope.filterselected = [];
        $scope.filterFields = [];
    }

    $scope.responseTemplate = function() {
        $scope.firstStep = false;
        $scope.secondstep = false;
        $scope.thirdstep = false;
        $scope.taskHeaderstep = false;
        $scope.responsestep = true;
    }




    $scope.selectedPlugin = function(data, index) {
        var service = {};
        $scope.setUpIndex = index;
        $scope.model[$scope.itemIndex - 1].subitems[0] = data.name;
        $scope.model[$scope.itemIndex - 1].active = true;
        $scope.intentTitile = $scope.model[$scope.itemIndex - 1].subitems[0];
        $scope.model[$scope.itemIndex - 1].plugin_id = data.id;
        // $scope.model[$scope.itemIndex - 1].save = true;
        service.pluginId = data.id;
        service.fromName = "methodTemplates";
        data.class = true;
        $scope.isLoad = true;
        // getPluginCredential(service);
        commonService.pluginCredential(service).then(function(pluginConfig) {
            $scope.joinIntents = [];
            angular.forEach(pluginConfig.templates.GetOrders.intents, function(iteratedIntents) {
                $scope.joinIntents.push(iteratedIntents);
            });
            angular.forEach(pluginConfig.templates.GetInvoice.intents, function(iteratedInvoiceIntetents) {
                $scope.joinIntents.push(iteratedInvoiceIntetents);
            });
                $scope.configuration = pluginConfig;
                $scope.model[$scope.itemIndex - 1].intents = $scope.joinIntents;        
                $scope.isLoad = false;
                $scope.activeMenu = "Choose Action";
                $scope.itemNext = 1;
                $scope.firstStep = false;
                $scope.secondstep = true;
                data.class = false;
        });
       


    }



    var intents = [];
    $scope.intentSelected = function(intent) {
        $scope.radioIntents = intent;
        $scope.intentOption = true;
        $scope.model[$scope.itemIndex - 1].selectedIntent = intent;
        console.log($scope.model);
    }




    $scope.selectedInputFilters = function(value) {
        $scope.filterselected.push(value);
        var newArr = [];
        var elseArr = [];
        angular.forEach($scope.filterselected, function(value, key) {
            var exists = false;
            angular.forEach(newArr, function(val2, key) {
                if (angular.equals(value.name, val2.name)) {
                    exists = true;
                    angular.forEach(newArr, function(duplicates) {
                        if (value.name == duplicates.name) {
                            var index = newArr.indexOf(duplicates);
                            newArr.splice(index, 1);
                            if (newArr.length == 0) {
                                $scope.fieldsSummary = false;
                            }
                        }
                    });
                };
            });
            if (exists == false && value.id != "") {
                $scope.selectedTags = true;
                newArr.push(value);
                $scope.fieldsSummary = true;
            }
        });
        $scope.selectedFields = angular.copy(newArr);
        console.log('newArray::', newArr)
        $scope.model[$scope.itemIndex - 1].selectedFilter = newArr;
        // console.log($scope.model);
    }




    var fields = [];
    $scope.selectedFields = [];
    $scope.fieldsOutputSelect = function(filedsTags, action) {
        $scope.filterFields.push(filedsTags);
        var newArr = [];
        var elseArr = [];
        angular.forEach($scope.filterFields, function(value, key) {
            var exists = false;
            angular.forEach(newArr, function(val2, key) {
                if (angular.equals(value, val2)) {
                    exists = true;
                    angular.forEach(newArr, function(duplicates) {
                        if (value == duplicates) {
                            var index = newArr.indexOf(duplicates);
                            newArr.splice(index, 1);
                            if (newArr.length == 0) {
                                $scope.responseFieldSummary = false;
                            }
                        }
                    });
                };
            });
            if (exists == false && value != "") {
                $scope.selectedTags = true;
                newArr.push(value);
                $scope.responseFieldSummary = true;

            }
        });
        $scope.filterFields = angular.copy(newArr);
        $scope.model[$scope.itemIndex - 1].fields = angular.copy(newArr);
        // console.log($scope.model);
    }




    $scope.QueryTemplates = function(queryFiled) {
        $scope.setUpIndex.sub += 1;
        $scope.filterTemplates = {};
        angular.forEach($scope.configuration.templates.GetOrders.intents, function(iteratedIntents) {
            if (angular.equals($scope.radioIntents, iteratedIntents)) {
                $scope.filterTemplates = $scope.configuration.templates.GetOrders;
            }
        });
        angular.forEach($scope.configuration.templates.GetInvoice.intents, function(iteratedInvoiceIntetents) {
            if (angular.equals($scope.radioIntents, iteratedInvoiceIntetents)) {
                $scope.filterTemplates = $scope.configuration.templates.GetInvoice;
            }
        });
        $scope.model[$scope.itemIndex - 1].filterTemplates = $scope.filterTemplates;
        $scope.model[$scope.itemIndex - 1].fields = "";
        if ($scope.model.length > 1) {
            taskplusItem($scope.taskId);
        }
        // console.log($scope.model); 
        $scope.secondstep = false;
        $scope.itemNext = 2;
        $scope.activeMenu = "Setup Template";
        $scope.thirdstep = true;
    }




    $scope.createTask = function() {
        $scope.firstStep = false;
        $scope.secondstep = false;
        $scope.thirdstep = false;
        $scope.taskHeaderstep = true;
        $scope.responsestep = false;

    }



    $scope.saveTasks = function(task) {
        $scope.task = task;
        task.status = "private";
        taskService.saveTask(task).then(function(taskId) {
            task.id = taskId;
            if (taskId.length >= 8) {
                $scope.taskId = taskId;
                $scope.task_saved = true;
                $scope.taskHeaderstep = false;
                if ($scope.activeMenu == undefined) {
                    $scope.activeMenu = "Choose Plugin";
                }
                $scope.activeMenu = $scope.activeMenu;
                $scope.itemIndex = $scope.itemIndex;
                commonService.alertMessage('Task creataed sucessfully', 'success', $alert)
                Allplugins({
                    main: $scope.itemIndex,
                    sub: $scope.itemNext
                });
            } else {
                commonService.alertMessage('Failed to create task ', 'error', $alert)
            }
        });
    }


    $scope.checkAutoLoad = function(datas, index) {
        console.log($scope.autoListIndex , index);
        if ($scope.autoListIndex == index) {
            $scope.autoListIndex = index + 1;
            $scope.autoLoad = false

        } else {
            $scope.autoListIndex = index;
            $scope.autoLoad = true
        }
    }

    $scope.addtags = function(data, index) {
        // console.log(index);
        // console.log($scope.model[$scope.itemIndex - 1].selectedFilter[index]);
        if (!$scope.model[$scope.itemIndex - 1].selectedFilter[index].actualValue) {
            $scope.model[$scope.itemIndex - 1].selectedFilter[index].actualValue = [];
        }
        if ($scope.model[$scope.itemIndex - 1].selectedFilter[index].actualValue.indexOf(data) == -1) {
            $scope.model[$scope.itemIndex - 1].selectedFilter[index].actualValue.push(data);
        }
    }


    $scope.loadTags = function(query) {
        return $scope.ouputInput;
    };


    function taskplusItem(id) {
        $scope.ouputInput = [];
        var totalInputs = [];
        taskService.getTaskWithItem($scope.taskId).then(function(taskWithItem) {
            angular.forEach(taskWithItem.childObjects, function(childrespose) {
                if (childrespose.sequence < $scope.model.length) {
                    childrespose.query_template.responseFields.forEach(function(iteratefields) {
                        totalInputs.push({
                            'id': childrespose.id,
                            'name': iteratefields,
                            'sequence': childrespose.sequence
                        });
                    });
                }
            });
        });
        // console.log('inputnsondjshjdshgjdhjghdsjgh:::',JSON.stringify(totalInputs));  
        $scope.ouputInput = totalInputs;
    }


    $scope.saveTaskItem = function() {
        if ($scope.taskId) {
            if ($scope.taskId.length >= 8) {
                var serviceItems = {};
                var Qfilter = {};
                var response = {};
                var tagFilter = [];
                var tagFilterSting = "";
                var StringFormate = null;
                var responseFields = "responseFields";
                var items = angular.copy($scope.model[$scope.itemIndex - 1]);
                console.log(JSON.stringify(items));
                serviceItems.name = items.title;
                serviceItems.intent_id = "fc5881c9-4b19-498c-98a6-95419e522971";
                serviceItems.plugin_id = items.plugin_id;               
                if (items.index > 1) {
                    angular.forEach(items.selectedFilter, function(eachFunctions) {
                        angular.forEach(eachFunctions.actualValue, function(values) {
                            if (values.id) {
                                if (tagFilterSting.length == 0) {
                                    tagFilterSting += values.id + '__' + values.name;
                                } else {
                                    tagFilterSting += '@@' + values.id + '__' + values.name;
                                }
                            } else {
                                if (tagFilterSting.length == 0) {
                                    tagFilterSting += values.name;
                                } else {
                                    tagFilterSting += '@@' + values.name;
                                }
                            }
                        });
                        eachFunctions.actualValue = tagFilterSting;
                    });
                }
                Qfilter.filter = items.selectedFilter;
                Qfilter.responseFields = items.fields;
                Qfilter.intentName = items.selectedIntent;
                serviceItems.query_template = Qfilter;
                serviceItems.sequence = items.index;
                var removeHashKey = angular.toJson(serviceItems);
                console.log(JSON.stringify(removeHashKey));
                if(items.save){                      
                       taskService.updateTaskItems($scope.taskId, items.id, removeHashKey).then(function(taskIdFromDb) {
                        $scope.isLoad = false;
                        if (taskIdFromDb.length >= 10) {
                            // $scope.addMenu();
                            $scope.model[$scope.itemIndex - 1].save = true;
                            commonService.alertMessage('TaskItem updated successfully', 'success', $alert)
                            // $scope.closeListIndex.push(items.index - 1);
                            // console.log($scope.closeListIndex);
                            // $scope.autoAddIndex = items.index + 1;
                            // $scope.activeMenu = "Choose Plugin";
                            // $scope.itemIndex = items.index + 1;
                            // $scope.listOfplugins($scope.activeMenu, 0, $scope.itemIndex);

                        } else {
                            commonService.alertMessage('Failed to update taskitem', 'error', $alert);
                          }
                   });

                }else{
                    taskService.saveTaskItems($scope.taskId, removeHashKey).then(function(taskIdFromDb) {
                    $scope.isLoad = false;
                    if (taskIdFromDb.length >= 10) {
                        $scope.addMenu();
                        $scope.model[$scope.itemIndex -1].id  = taskIdFromDb;
                        $scope.model[$scope.itemIndex - 1].save = true;
                        commonService.alertMessage('TaskItem created successfully', 'success', $alert)
                        $scope.closeListIndex.push(items.index - 1);
                        console.log($scope.closeListIndex);
                        $scope.autoAddIndex = items.index + 1;
                        $scope.activeMenu = "Choose Plugin";
                        $scope.itemIndex = items.index + 1;
                        $scope.listOfplugins($scope.activeMenu, 0, $scope.itemIndex);

                    } else {
                        commonService.alertMessage('Failed to create taskitem', 'error', $alert);
                      }
                   });
                }

               
            } else {
                commonService.alertMessage('Please create task first', 'error', $alert);
            }
        } else {
            commonService.alertMessage('Please create task first', 'error', $alert);


        }
    }



    $scope.itemTitleEdit = function(itemIndex, originalIndex) {
        $scope.enableReadonly = false;
        $scope.EditIndex = itemIndex;
        $scope.colorStepReadonlyEdit = "changetolabelEdit";
    }

    $scope.itemTitlefocusRemove = function(itemIndex, originalIndex) {
        $scope.enableReadonly = true;
        $scope.EditIndex = "";
    }

    var vm = this;
    vm.isSubmitted = false;
    $scope.validateInput = function(name, type) {
        if (vm.formValidate) {
            var input = vm.formValidate[name];
            return (input.$valid || vm.isSubmitted) && input.$error[type];
        } else if (vm.formValidateResponse) {
            var input = vm.formValidateResponse[name];
            return (input.$valid || vm.isSubmitted) && input.$error[type];
        }
    };

    $scope.submitForm = function(task, action) {
        if (vm.formValidate) {
            if (vm.formValidate.$valid) {
                vm.isSubmitted = false;
                $scope.saveTasks(task);
            }

        } else if (vm.formValidateResponse) {
            if (vm.formValidateResponse.$valid) {
                vm.isSubmitted = false;
                if ($scope.taskId) {
                    console.log(task)
                    $scope.task.response_template = JSON.stringify(task);
                    console.log($scope.task);
                    $scope.saveTasks($scope.task);
                } else {
                    commonService.alertMessage('Create task first', 'error', $alert);
                }

            }

        } else {
            vm.isSubmitted = true;
        }
    };




    // var vm = this;
    $scope.validateForClass = function(name, modelValue) {
        var str = '';
        if (vm.formValidate && vm.formValidate[name]) {
            var input = vm.formValidate[name];
            modelValue = modelValue ? modelValue + "" : modelValue;
            if (modelValue == " " || modelValue == " ") {
                modelValue = ""
            }
            str += (input.$valid && modelValue && (modelValue.length > 0)) ? 'has-success' : (input.$invalid || !modelValue) ? 'is-empty' : '';
            return str;
        }
        if (vm.formValidateResponse && vm.formValidateResponse[name]) {
            var input = vm.formValidateResponse[name];
            modelValue = modelValue ? modelValue + "" : modelValue;
            if (modelValue == " " || modelValue == " ") {
                modelValue = ""
            }
            str += (input.$valid && modelValue && (modelValue.length > 0)) ? 'has-success' : (input.$invalid || !modelValue) ? 'is-empty' : '';
            return str;
        }

    };

 



}]);
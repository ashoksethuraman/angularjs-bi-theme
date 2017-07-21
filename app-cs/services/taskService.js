angular.module('business-insights').factory('taskService', ['$q', '$http', '$localStorage', function($q, $http, $localStorage) {



    return ({
        saveTask: saveTask,
        listTasks: listTasks,
        deleteTask: deleteTask,
        saveTaskItems: saveTaskItems,
        updateTaskItems : updateTaskItems,
        getTaskWithItem: getTaskWithItem

    });



    function getTaskWithItem(taskId) {
        var deferred = $q.defer();
        $http.get($localStorage.baseURL + '/api/business-insights/v1/task/' + taskId, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            // console.log(JSON.stringify(data), status);
            data.status = status;
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            deferred.resolve(data);;
        });
        return deferred.promise;
    }



    function saveTaskItems(taskId, taskitem) {
        var deferred = $q.defer();
        $http.post($localStorage.baseURL + '/api/business-insights/v1/task/' + taskId + '/item', taskitem, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status, headers) {
            // console.log(JSON.stringify(data), status);
            data.status = status;
            if (status === 200) {
                deferred.resolve(headers('Location'));
            } else {
                deferred.resolve(headers('Location'));
            }
        }).error(function(data) {
            deferred.resolve(data);;
        });
        return deferred.promise;
    }




     function updateTaskItems(taskId, taskitemId, taskitem) {
        var deferred = $q.defer();
        $http.put($localStorage.baseURL + '/api/business-insights/v1/task/' + taskId + '/item/'+taskitemId, taskitem, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status, headers) {
            data.status = status;
            if (status === 200) {
                deferred.resolve(headers('Location'));
            } else {
                deferred.resolve(headers('Location'));
            }
        }).error(function(data) {
            deferred.resolve(data);;
        });
        return deferred.promise;
    }


    function deleteTask(taskId) {
        var deferred = $q.defer();
        $http.delete($localStorage.baseURL + '/api/business-insights/v1/task/' + taskId, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            // console.log(JSON.stringify(data), status);
            data.status = status;
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            deferred.resolve(data);;
        });
        return deferred.promise;
    }




    function listTasks(taskDetails) {
        var deferred = $q.defer();
        $http.get($localStorage.baseURL + '/api/business-insights/v1/task/list?pageSize=6&requiredPage=1', {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            // console.log(JSON.stringify(data), status);
            data.status = status;
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            // console.log(data)
            deferred.resolve(data);;
        });
        return deferred.promise;
    }




    function saveTask(taskDetails) {
        var deferred = $q.defer();
        console.log(taskDetails);
        if (taskDetails.id) {
            $http.put($localStorage.baseURL + '/api/business-insights/v1/task/'+taskDetails.id, taskDetails, {
                headers: {
                    'Authorization': $localStorage.accessToken
                }
            }).success(function(data, status, headers) {
                // console.log('TASK SERVICE::::::', data, status, headers('Location'));
                data.task_id = headers('Location');
                data.status = status;
                if (status === 200) {
                    deferred.resolve(headers('Location'));
                } else {
                    deferred.resolve(headers('Location'));
                }
            }).error(function(data) {
                deferred.resolve(data);;
            });
            return deferred.promise;

        } else {
            $http.post($localStorage.baseURL + '/api/business-insights/v1/task', taskDetails, {
                headers: {
                    'Authorization': $localStorage.accessToken
                }
            }).success(function(data, status, headers) {
                data.task_id = headers('Location');
                data.status = status;
                if (status === 200) {
                    deferred.resolve(headers('Location'));
                } else {
                    deferred.resolve(headers('Location'));
                }
            }).error(function(data) {
                // console.log(data)
                deferred.resolve(data);;
            });
            return deferred.promise;

        }
    }




}]);
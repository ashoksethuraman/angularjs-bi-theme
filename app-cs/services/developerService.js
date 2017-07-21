angular.module('business-insights').factory('developerService', ['$q', '$http', '$localStorage', function($q, $http, $localStorage) {



    return ({
        developersList: developersList,
        keyStatusUpdate: keyStatusUpdate,
        developerPluginList : developerPluginList,
        pluginApproveS3 : pluginApproveS3,
        pluginRejected :pluginRejected
        


    });

  function pluginRejected(pluginRejected) {
        var deferred = $q.defer();
        console.log(pluginRejected);
        $http.post($localStorage.baseURL+'/api/business-insights/v1/developer/plugin/rejected', pluginRejected, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            console.log(JSON.stringify(data), status);
            data.status = status;
            if (status === 200) {
                deferred.resolve(data);                
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            console.log(data)
            deferred.reject(data);
        });
        return deferred.promise;
    }



    function pluginApproveS3(keyStatus) {
        var deferred = $q.defer();
        $http.post($localStorage.baseURL+'/api/business-insights/v1/uploads/s3', keyStatus, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            console.log(JSON.stringify(data), status);
            if (status === 200) {
                deferred.resolve(data);
                
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            console.log(data)
            deferred.reject(data);
        });
        return deferred.promise;
    }






    function keyStatusUpdate(keyStatus) {
        var deferred = $q.defer();
        console.log(keyStatus);
        $http.post($localStorage.baseURL + '/api/business-insights/v1/developer/key/status', keyStatus, {
            headers: {
                'Authorization': $localStorage.accessToken
            }
        }).success(function(data, status) {
            console.log(JSON.stringify(data), status, keyStatus);
            if (status === 200) {
                deferred.resolve(data);
                
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            console.log(data)
            deferred.reject(data);
        });
        return deferred.promise;
    }






    function developerPluginList(status) {
        var deferred = $q.defer();
        console.log(status);
        $http.get($localStorage.baseURL + '/api/business-insights/v1/developer/plugins/list', {
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
            console.log(data)
            deferred.reject(data);
        });
        return deferred.promise;
    }



    function developersList(status) {
        var deferred = $q.defer();
        console.log(status);
        $http.get($localStorage.baseURL + '/api/business-insights/v1/developer/' + status, {
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
            console.log(data)
            deferred.reject(data);
        });
        return deferred.promise;
    }




}]);
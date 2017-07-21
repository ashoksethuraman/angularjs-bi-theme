angular.module('business-insights').factory('billingService', ['$q', '$http', '$localStorage', function($q, $http, $localStorage) {

    return ({
        billingDetails: billingDetails,
        getAllBillings: getAllBillings,
        getIdBillings: getIdBillings,
        billingplans : billingplans
    });


 console.log($localStorage);
 function billingplans(accessToken) {
        var deferred = $q.defer();
        console.log(accessToken);
        $http.get($localStorage.baseURL+'/api/business-insights/v1/billing-plans',{
            headers: {
                'Authorization': accessToken
            }
        }).success(function(data, status) {
            // console.log('billingplans::; ', status, data);
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.reject(data);
            }
        }).error(function(data) {
            deferred.reject(data);
        });
        return deferred.promise;
    }




    function getIdBillings(id, accessToken) {
        var deferred = $q.defer();
        $http.get($localStorage.baseURL+'/api/business-insights/v1/billing/id/' + id,{
            headers: {
                'Authorization': accessToken
            }
        }).success(function(data, status) {
            console.log('Billing plansss',data, status);
            data.status =  status
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            deferred.resolve(data);
        });
        return deferred.promise;
    }



    function getAllBillings(accessToken) {
        var deferred = $q.defer();
        $http.get($localStorage.baseURL+'/api/business-insights/v1/billings',{
            headers: {
                'Authorization': accessToken
            }
        }).success(function(data, status) {
            data.status = status;
            if (status === 200) {
                deferred.resolve(data);
            } else {
                deferred.resolve(data);
            }
        }).error(function(data) {
            deferred.resolve(data);

        });
        return deferred.promise;
    }







    function billingDetails(billingData, accessToken) {
        var deferred = $q.defer();
        if (billingData.id) {
            $http.put($localStorage.baseURL+'/api/business-insights/v1/billing/id/update', billingData, {
                headers: {
                'Authorization': accessToken
                  }
            }).success(function(data, status) {
                console.log('Resulsts', status, data)
                data.status = status;
                if (status === 201) {
                    deferred.resolve(data);
                } else {
                    deferred.resolve(data);
                }
            }).error(function(data) {
                deferred.resolve(data);

            });
            return deferred.promise;
        } else {
            $http.post($localStorage.baseURL+'/api/business-insights/v1/billing/update', billingData, {
                headers: {
                'Authorization': accessToken
                  }
            }).success(function(data, status) {
                var data = {};
            	console.log(data, status);
                data.status = status;
                if (status === 201) {
                    deferred.resolve(data);
                } else {
                    deferred.resolve(data);
                }
            }).error(function(data) {
                deferred.resolve(data);

            });
            return deferred.promise;
        }
    }



}]);
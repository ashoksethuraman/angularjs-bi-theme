angular.module('business-insights').controller('manageUserController', ['$stateParams', '$localStorage', '$state', '$scope', '$http', 'ngDialog', 'profileService', 'billingService', function($stateParams, $localStorage, $state, $scope, $http, ngDialog, profileService, billingService) {

    // if ($localStorage.accessToken) {} else {
    //     $state.go('sign');
    // }

    $scope.Action = false;
    $scope.butttonName = "Edit";

    checkUrl();

    function checkUrl() {
        if ($stateParams.view_edit == undefined || $stateParams.view_edit == "view" || $stateParams.view_edit == "edit" || $stateParams.view_edit == "create") {
            if ($stateParams.view_edit == "view") {
                $scope.id = $stateParams.id;
                $scope.stateParams = $stateParams
                $scope.isView = true;
                $scope.isSave = false;
                $scope.isEdit = false;
                $scope.users = {};
            } else if ($stateParams.view_edit == "edit") {
                $scope.id = $stateParams.id;
                $scope.isView = false;
                $scope.isSave = false;
                $scope.stateParams = $stateParams;
                $scope.isEdit = true;
                $scope.action = "Edit";
                $scope.users = {};
                editUser($scope.id);
            } else if ($stateParams.create == "create") {
                var date = new Date();
                $scope.isView = false;
                $scope.isSave = true;
                $scope.stateParams = $stateParams;
                $scope.isEdit = false;
                $scope.action = "Create";
                $scope.users = {};
            } else {
                $scope.users = {};
                $scope.pageno = 1; // initialize page no to 1
                $scope.total_count = 0;
                $scope.itemsPerPage = 10;
            }
        } else {
            $state.go("/login");
        }
    };




    function editUser(userId) {
        profileService.getUserProfile(userId, $localStorage.accessToken).then(function(userDetails) {
            console.log('userDetails::', userDetails);
            $scope.userProfile = userDetails;
        });
    }

    billingList();

    function billingList() {
        billingService.billingplans($localStorage.accessToken).then(function(billingplan) {
            angular.forEach(billingplan.billingPlans, function(formateJson) {
                var removejson = formateJson.plugins.value.toString();
                var index = 0;
                removejson = removejson.substr(0, index) + "[" + removejson.substr(index + 1);
                removejson = removejson.substr(0, removejson.length - 1) + "]";
                var array = JSON.parse(removejson.toString());
                formateJson.plugins = array;
            });
            $scope.totalbillings = billingplan;
        });
    }

    $scope.editAction = function(action) {
        $scope.butttonName = "Save";
        $scope.Action = true;
        if (action == "Save") {
            console.log($scope.userProfile);
            profileService.updateUserBillingPlans($scope.userProfile).then(function(updatedPlans) {
                console.log(updatedPlans);

            })


        }

    }


    $scope.addbillingTouser = function(Addbillig) {
        var exist = false;
        console.log($scope.userProfile.json_agg);
        angular.forEach($scope.userProfile.json_agg, function(userbillingsplans) {
            if (userbillingsplans.billing_id == Addbillig.billing_id) {
                exist = true;
            }
        });
        if (exist != true) {
            $scope.userProfile.json_agg.push(Addbillig);
        }

    }


    $scope.deleteplans = function(deleteUserPlans) {
        var exist = false;
        angular.forEach($scope.userProfile.json_agg, function(deleteuserbillingsplans) {
            if (deleteuserbillingsplans.billing_id == deleteUserPlans.billing_id) {
                exist = true;
                var index = $scope.userProfile.json_agg.indexOf(deleteuserbillingsplans);
                $scope.userProfile.json_agg.splice(index, 1);
            }
        });

    }



    $scope.addBlling = function() {
        angular.forEach($scope.totalbillings.billingPlans, function(totalPlan) {
            console.log($scope.userProfile.json_agg);
            angular.forEach($scope.userProfile.json_agg, function(userprofilesPlan) {
                if (totalPlan.billing_id == userprofilesPlan.billing_id) {
                    var index = $scope.totalbillings.billingPlans.indexOf(totalPlan);
                    $scope.totalbillings.billingPlans.splice(index, 1);
                }
            })
        });
        if ($scope.totalbillings) {
            ngDialog.openConfirm({
                template: 'addingbilling',
                className: 'ngdialog-theme-default',
                scope: $scope
            });
        }
    }




    userList();

    function userList() {
        profileService.usergetAll().then(function(userAll) {
            angular.forEach(userAll.UserList, function(userList) {
                var d = new Date(userList.created_at);
                userList.date = d.toLocaleDateString();
                var role = JSON.parse(userList.user_roles.value);
                userList.role = role.role;
            });
            $scope.listUser = userAll;
        }).catch(function(err) {
            console.log("error", err)
        });

    }




}]);
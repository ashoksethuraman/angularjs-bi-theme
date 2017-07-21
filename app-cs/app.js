var app = angular.module('business-insights', ['ngTagsInput', 'ui.router', 'ngStorage', 'ui.bootstrap','rzModule','ngDialog','ngFileUpload', 'mgcrea.ngStrap', 'angularUtils.directives.dirPagination']);




app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    
$locationProvider.html5Mode(true);
    $stateProvider
     .state('common', {
            templateUrl: 'app-cs/views/common/common.html',
            abstract: true,
            controller: 'commonController'
        }).state('login', {
            templateUrl: 'app-cs/views/login.html',
            controller: 'userController',
            controllerAs:"us",
            url: "/login"
        }).state('signup', {
            templateUrl: 'app-cs/views/signup.html',
            controller: 'userController',
            controllerAs:"us",
            url: "/signup"
        }).state('home',{
        	templateUrl: 'app-cs/views/dashbord.html',
          controller: 'dashboardController',
        	parent:"common",
          url:"/home"         
        }).state('invite', {
          templateUrl: 'app-cs/views/invite.html',
          controller: 'inviteController',
          parent:"common",
          url:"/user-invite"
        }).state('bulkinvite',{
          templateUrl: 'app-cs/views/bulk-invite.html',
          controller: 'inviteController',
          parent:"common",
          url:"/bulk-invite" 
        }).state('manageuser',{
          templateUrl: 'app-cs/views/manage-user.html',
          controller: 'manageUserController',
          parent:"common",
          url:"/user-manage" 
        }).state('user-updates', {
            templateUrl: 'app-cs/views/edit_user.html',
            controller: 'manageUserController',
            controllerAs: 'mc',
            url: '/user/:id/:view-edit',
            parent: 'common',
            params: { 
              view_edit: 'edit'
            }
        }).state('developers', {
            templateUrl: 'app-cs/views/manage_developers.html',
            controller: 'developerController',
            controllerAs: 'dc',
            url: '/developers',
            parent: 'common'
        }).state('registerplugin',{
          templateUrl: 'app-cs/views/register_plugin.html',
          controller: 'pluginController',
          parent:"common",
          url:"/register-plugins"

        }).state('plugin-manage',{
          templateUrl: 'app-cs/views/manage_plugins.html',
          controller: 'pluginController',
          parent:"common",
          url:"/manage-plugins"
        }).state('billings',{
          templateUrl: 'app-cs/views/cve_billings.html',
          controller: 'billingController',
          controllerAs: 'v',
          parent:"common",
          url:"/billing-plan",
          params: { 
            create: 'create' 
          }
        }).state('billing-view-edit', {
            templateUrl: 'app-cs/views/cve_billings.html',
            controller: 'billingController',
            controllerAs: 'v',
            url: '/billing-plan/:id/:view-edit',
            parent: 'common',
            params: { 
              view_edit: 'edit'
            }
        }).state('billing-list', {
            templateUrl: 'app-cs/views/manage_billing.html',
            controller: 'billingController',
            controllerAs: 'v',
            url: '/billing-plan/list',
            parent: 'common',
            params: { 
              view_edit: 'view'
            }
        }).state('tasks', {
            templateUrl: 'app-cs/views/making_task.html',
            controller: 'taskController',
            controllerAs: 'tc',
            url: '/task',
            parent: 'common'
        }).state('task-item', {
            templateUrl: 'app-cs/views/list_task.html',
            controller: 'listTaskController',
            controllerAs: 'tc',
            url: '/task/list',
            parent: 'common'
        }).state('task-view', {
            templateUrl: 'app-cs/views/making_task.html',
            controller: 'taskController',
            controllerAs: 'tc',
            url: '/task/:id/:view-edit',
            parent: 'common',
            params: {               
                view_edit:'view'
            },
        });

      $urlRouterProvider.otherwise('/login');

        
}]);



app.directive('leftMenu', function() {
  return {
      restrict: 'AE',
      templateUrl:'app-cs/views/common/left_menu.html',
      replace: 'true',
       scope: { 
            menu: '=menu',    
            htest: '&htest'           
        },
            
  };
});

app.directive('topNavigation', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: 'app-cs/views/common/top_navigation.html',
      scope: {
        logout: '&logout',
        menu :'=menu'

      },
  };
});




app.directive('loader', function() {
    return {
        replace: true,
        template: '<div class=""><div class="loader"><div class="loader--dot"></div><div class="loader--dot"></div> <div class="loader--dot"></div><div class="loader--dot"></div> <div class="loader--dot"></div> <div class="loader--dot"></div> <div class="loader--text"></div></div></div>',
        restrict: 'EA',

    };
});



app.directive('searchPagination', function() {
    return {
        replace: true,
        template: '<div align="left"><dir-pagination-controls max-size="8"direction-links="true"boundary-links="true" on-page-change="getData(newPageNumber)" > </dir-pagination-controls></div>',
        restrict: 'A'

    };
});















/**
 * Created by ZLY on 2017/3/29.
 */
(function () {
    'use strict';
    const app = angular.module('myApp');
    // 设置controller
    app.controller('IndexController', IndexController);

    IndexController.$inject = ['$scope'];
    function IndexController($scope) {
       $scope.name="Jam";
    }

    // 设置路由
    app.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('index', {
            url: '/index',
            views: {
                'content': {
                    templateUrl: 'index.html',
                    controller: 'IndexController',
                    controllerAs: 'vm'
                }
            }
        });
    }]);
})();
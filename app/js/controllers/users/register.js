/**
 * Created by ZLY on 2017/3/29.
 */
(function () {
    'use strict';
    const app = angular.module('myApp');
    // 设置controller
    app.controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope','$location','$anchorScroll'];
    function RegisterController($scope,$location,$anchorScroll) {
        $scope.user = {
            name: "",
            password: "",
            sex: "male"
        };
        $scope.allHobbits = [
            {value: "football", chName: "足球"},
            {value: "basketball", chName: "篮球"},
            {value: "run", chName: "跑步"},
            {value: "ping-pang", chName: "乒乓球"}
        ];
        $scope.clickMe = function () {
            $location.hash('testP');
            $anchorScroll();
        }
    }

    // 设置路由
    app.config(["$stateProvider", function ($stateProvider,) {
        $stateProvider.state('register', {
            url: '/user/register',
            views: {
                'content': {
                    templateUrl: 'users/register.html',
                    controller: 'RegisterController',
                    controllerAs: 'vm'
                }
            }
        });
    }]);
})();
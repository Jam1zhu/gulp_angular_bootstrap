/**
 * Created by ZLY on 2017/3/28.
 */
(function(){
    const app = angular.module('myApp');
    // 设置controller
    app.controller('LoginController', LoginController);

    IndexController.$inject = ['$scope'];
    function IndexController($scope) {
        $scope.userName = "zhu";
    }

    // 设置路由
    app.config(["$stateProvider", function ($stateProvider) {
        $stateProvider.state('index', {
            url: '/index',
            views: {
                'content': {
                    templateUrl: './dist/view/index.html',
                    controller: 'IndexController',
                    controllerAs: 'vm'
                }
            }
        });
    }]);
})();
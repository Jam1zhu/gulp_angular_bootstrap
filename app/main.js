/**
 * Created by ZLY on 2017/3/24.
 */
(function () {
    'use strict';
    // 注入模块
    angular.module('myApp', [
        'ui.router'
        ,'ngResource'
        ,'ngAnimate'
    ]);

    // 注入$urlRouterProvider
    const stateConfig = ($urlRouterProvider)=> {
        $urlRouterProvider.otherwise('/index');
    };
    // 解析路由
    angular
        .module('myApp')
        .config(stateConfig);
    stateConfig.$inject = ['$urlRouterProvider'];
})();
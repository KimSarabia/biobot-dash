
'use strict';

var app = angular.module('biobotsApp', ['ui.router', 'ui.bootstrap', 'angular-loading-bar']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'mainCtrl'
        })
        .state('home', {
            url: '/home',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('admindash', {
            url: '/admindash',
            templateUrl: '/html/admindash.html',
            controller: 'admindashCtrl'
        })
        .state('printerdash', {
            url: '/printerdash',
            templateUrl: '/html/printerdash.html',
            controller: 'printerdashCtrl'
        })
        .state('detailview', {
            url: '/html/detailview.html',
            templateUrl: '/html/detailview.html',
            controller: 'detailviewCtrl'
        })
    $urlRouterProvider.otherwise('/');

})

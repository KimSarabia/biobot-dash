
'use strict';

var app = angular.module('biobotsApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('admindash', {
            url: '/home:devicetype',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
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

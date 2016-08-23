
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
            templateUrl: '/html/home.html'
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
            controller: 'detailCtrl'
        })
        .state('newbioprint', {
            url: '/html/newbioprint.html',
            templateUrl: '/html/newbioprint.html',
            controller: 'newBioprintCtrl'
        })
        .state('bioprinttableview', {
            url: '/html/bioprinttableview.html',
            templateUrl: '/html/bioprinttableview.html',
            controller: 'bioprintTableViewCtrl'
        })
        .state('usertableview', {
            url: '/html/usertableview.html',
            templateUrl: '/html/usertableview.html',
            controller: 'userTableViewCtrl'
        })
    $urlRouterProvider.otherwise('/');

})

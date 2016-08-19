'use strict';

var app = angular.module('biobotsApp');


app.service('admindashService',function($http) {
    this.getAllPrints = () => {
        return $http.get('./api/bioprints');
    };
});

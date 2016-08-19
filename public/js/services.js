'use strict';

var app = angular.module('biobotsApp');


app.service('admindashService',function($http) {
    this.getAllPrints = () => {
        return $http.get('./api/bioprints');
    };
    this.saveBioprint = bioprint => {
        return $http.post('/api/bioprints', bioprint);
    };
    this.removeBioprint = (bioprintId) => {
        return $http.delete(`/api/bioprints/${id}`);
    };

    this.getAllUsers = () => {
        return $http.get('./api/users');
    };

});

app.service('userdashService',function($http) {
    this.findByUser = () => {
        return $http.get(`./api/users/${user}`);
    };

});

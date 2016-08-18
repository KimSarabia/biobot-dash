'use strict';

var app = angular.module('biobotsApp');


app.service('admindashService',function($http) {
    this.getAllPrints = () => {
        return $http.get('./api/bioprints');
    };
    this.getAllUsers = () => {
        return $http.get('./api/bioprints');
    };
    this.getById = (searchId) => {
        return $http.post(`./api/bioprints/${id}`,{id:searchId});
    };
    this.addBioprint = (bioprint, model) => {
        return $http.post('./api/bioprints/newbioprint', {bioprint: bioprint, model});
    };
    this.deleteById = id => {
        return $http.delete(`./api/bioprints/${id}`);
    };
    this.deleteByUser = user => {
        return $http.delete(`./api/bioprints/${user}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/bioprints/${id}`, {item: newPost});
    }
});

app.service('printerdashService',function($http) {
    this.getAll = () => {
        return $http.get('./api/bioprints');
    };
    this.getById = (searchId) => {
        return $http.post(`./api/bioprints/${id}`,{id:searchId});
    };
    this.addBioprint = (bioprint, model) => {
        return $http.post('./api/bioprints/newbioprint', {bioprint: bioprint, model});
    };
    this.deleteById = id => {
        return $http.delete(`./api/bioprints/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/bioprints/${id}`, {item: newPost});
    }
});

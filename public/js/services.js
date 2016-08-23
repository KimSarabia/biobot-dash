'use strict';

var app = angular.module('biobotsApp');


app.service('admindashService',function($http) {
    this.getAllPrints = () => {
        return $http.get('./api/bioprints').then(res=>{
            console.log("fetched bioprints");
            this._bioprints = res;
            return res;
        });
    };
    this._bioprints = null;
    this._pageSize = 10;

    this.getPaginatedPrints = pageNo => {
        function getPrintsPromise(dataSet){
          return new Promise((resolve,reject)=>{
              var res = {};
              for(var i in dataSet){
                if(i!=='data'){
                  dataSet[i] = dataSet[i];
                }
              }
              res.page_info = {
                  max_page : Math.ceil(dataSet.data.length/this._pageSize),
                  current_page : pageNo
              };
              res.data = dataSet.data.slice(pageNo* this._pageSize,(pageNo+1)*this._pageSize);
              resolve(res);
          });
        }
        if(!this._bioprints){
          return this.getAllPrints().then(_res => {
              return getPrintsPromise.call(this,_res);
          });
        }
        return getPrintsPromise.call(this,this._bioprints);
    }
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

app.factory('detailService',['$http',function($http){
    var _id = "a";

    return {
        getId : function(){
            return _id;
        },
        setId : function(id){
            _id = id;
        },
        getBioprint : function(){
            return   $http({
                method:'GET',
                url:`/api/bioprints/${_id}`
              });
        }
    }
}]);



app.service('userdashService',function($http) {
    this.findByUser = () => {
        return $http.get(`./api/users/${user}`);
    };

});

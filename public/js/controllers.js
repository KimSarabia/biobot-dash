app.controller('mainCtrl', function ($scope, $rootScope, $state,  $window, $location) {
  $rootScope.$on('$stateChangeStart', function() { $window.scrollTo(0,0) });
  console.log('main!');
});

app.controller('homeCtrl', function ($scope, $state) {
  console.log('home!');
});

app.controller('admindashCtrl', function($scope, $timeout ,$state, admindashService, userdashService) {
  console.log('admin!');


    $scope.pages = [];
    $scope.getPaginatedPrints = function(pageNumber){
      admindashService.getPaginatedPrints(pageNumber).then(res => {
          console.log(pageNumber);
          console.log(res.data);
          $scope.prints = res.data;
          $scope.totalPrints = res.data.length;

          $scope.totalDeadPercent = 0;
          for( var i = 0; i < res.data.length; i++ ){
              $scope.totalDeadPercent += parseInt( res.data[i].print_data.deadPercent, 10 );
          }
          $scope.deadPercentAvg = Math.ceil((($scope.totalDeadPercent)/(res.data.length)) * 100) /100;
          $scope.totalLivePercent = 0;
          for( var i = 0; i < res.data.length; i++ ){
              $scope.totalLivePercent += parseInt( res.data[i].print_data.livePercent, 10 );
          }
          $scope.livePercentAvg = Math.ceil((($scope.totalLivePercent)/(res.data.length)) * 100) /100;
          var currentPage = res.page_info.current_page;
          var maxpage = res.page_info.max_page;

          $scope.pages = [0];
          if(maxpage >= 5){
            if(currentPage <= 1 ){
              $scope.pages = $scope.pages.concat([1,2,3]);
            }else if(currentPage >=2 && currentPage < maxpage - 1){
               $scope.pages = $scope.pages.concat([currentPage-1,currentPage,currentPage+1]);
            }else{
               $scope.pages = $scope.pages.concat([maxpage-3,maxpage-2,maxpage-1]);
            }
            $scope.pages.push(maxpage);
          }else{
            $scope.pages = [0,1,2,3];
          }



          //15

          //8 ....1,  7,8,9 , 15

          $timeout(()=>{
            $scope.$apply();
          });

      }).catch(err=>console.log(err));
    }

    $scope.getPaginatedPrints(0);


    admindashService.getAllUsers().then(res => {
        $scope.users = res.data;
          $scope.uniqueUsers = (res.data).reduceRight(function (r, a) {
              r.some(function (b) { return a.email === b.email; }) || r.push(a);
              return r;
          }, []);
          $scope.uniqueUsersLength = $scope.uniqueUsers.length
          $scope.latestUser = $scope.uniqueUsers[0];

    });




});

app.controller('newBioprintCtrl', function($scope, $state, admindashService, userdashService) {
console.log('new Bioprint!');

      $scope.saveBioprint = function() {
          admindashService.saveBioprint($scope.newBioprint).then(res => {
              $scope.bioprints.push(res.data);
              $scope.newBioprint = {};
          });
          $state.go('admindash');
      };
});

app.controller('printerdashCtrl', function ($scope, $state, userdashService) {
  console.log('printer dashboard!');
});

app.controller('detailviewCtrl', function ($scope, $state) {
  console.log('detail view!');
});

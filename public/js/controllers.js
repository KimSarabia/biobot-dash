app.controller('mainCtrl', function ($scope, $rootScope, $state,  $window, $location) {
  $rootScope.$on('$stateChangeStart', function() { $window.scrollTo(0,0) });
  console.log('main!');
});

app.controller('homeCtrl', function ($scope, $state) {
  console.log('home!');
});

app.controller('admindashCtrl', function($scope, $state, admindashService) {
  console.log('admin!');

    admindashService.getAllPrints().then(res => {
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
    });
});


app.controller('printerdashCtrl', function ($scope, $state, printerdashService) {
  console.log('printer dashboard!');
});

app.controller('detailviewCtrl', function ($scope, $state) {
  console.log('detail view!');
});

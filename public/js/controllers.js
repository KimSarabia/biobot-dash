app.controller('mainCtrl', function ($scope, $rootScope, $state,  $window, $location) {
  $rootScope.$on('$stateChangeStart', function() { $window.scrollTo(0,0) });
  console.log('main!');
});

app.controller('homeCtrl', function ($scope, $state) {
  console.log('home!');
});

app.controller('admindashCtrl', function($scope, $state, admindashService, userdashService) {
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

    admindashService.getAllUsers().then(res => {
        $scope.users = res.data;
          $scope.uniqueUsers = (res.data).reduceRight(function (r, a) {
              r.some(function (b) { return a.email === b.email; }) || r.push(a);
              return r;
          }, []);
          $scope.uniqueUsersLength = $scope.uniqueUsers.length
          $scope.latestUser = $scope.uniqueUsers[0];

    });

    function ctrlRead($scope, $filter) {
    // init
    $scope.sortingOrder = sortingOrder;
    $scope.reverse = false;
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;
    $scope.items = $scope.uniqueUsers;
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };

    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

    // change sorting order
    $scope.sort_by = function(newSortingOrder) {
        if ($scope.sortingOrder == newSortingOrder)
            $scope.reverse = !$scope.reverse;

        $scope.sortingOrder = newSortingOrder;

        // icon setup
        $('th i').each(function(){
            // icon reset
            $(this).removeClass().addClass('icon-sort');
        });
        if ($scope.reverse)
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
        else
            $('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
    };
};


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

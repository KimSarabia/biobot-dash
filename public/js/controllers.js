app.controller('mainCtrl', function ($scope, $rootScope, $state,  $window, $location) {
  $rootScope.$on('$stateChangeStart', function() { $window.scrollTo(0,0) });
  console.log('main!');
});
app.controller('homeCtrl', function ($scope, $state) {
  console.log('home!');
});

app.controller('admindashCtrl', function ($scope, $state, admindashService) {
  console.log('admin dashboard!');
});

app.controller('printerdashCtrl', function ($scope, $state, printerdashService) {
  console.log('printer dashboard!');
});

app.controller('detailviewCtrl', function ($scope, $state) {
  console.log('detail view!');
});

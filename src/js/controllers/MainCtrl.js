angular.module('MainCtrl', [])

.controller('mainController', ['$scope', '$http', function($scope, $http) {

    $scope.sortType     = 'sale_price'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchFish   = '';     // set the default search/filter term

    $http.get('/giltdata').success(function(data) {
      console.log(data.sales);
      $scope.data = data.sales;
    });

}]);

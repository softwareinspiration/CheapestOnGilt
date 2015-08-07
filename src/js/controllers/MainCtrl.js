var main = angular.module('MainCtrl', ['ngAnimate', 'ngMaterial']);




main.controller('mainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.sortType     = 'sale_price'; // set the default sort type
    $scope.sortReverse  = true;  // set the default sort order
    $scope.searchItems   = '';     // set the default search/filter term

    $http.get('/giltdata').success(function(data) {
      console.log(data.sales);
      $scope.data = data.sales;
    });

    $scope.currentPage = 0;
    $scope.pageSize = 20;

    $scope.numberOfPages=function(){
        return Math.ceil($scope.data.length/$scope.pageSize);
    };

    $scope.setSort = function ($event, sortType) {
      console.log($event);
      if ($scope.sortType === sortType) {
        $scope.sortReverse = !$scope.sortReverse;
      }
      else if (sortType === 'percent_discount') {
        $scope.sortType = sortType;
        $scope.sortReverse = true; }
      else {
        $scope.sortType = sortType;
        $scope.sortReverse = false;
      }
    };

      $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };

    $scope.storeIncludes = [];
    $scope.includeStore = function(store) {
      var i = $.inArray(store, $scope.storeIncludes);
      if (i > -1) {
        $scope.storeIncludes.splice(i,1);
      } else {
        $scope.storeIncludes.push(store);
      }
    };

    $scope.storeFilter = function(store) {
    if ($scope.storeIncludes.length > 0) {
        if ($.inArray(store.sale_store, $scope.storeIncludes) < 0)
            return;
    }
    return store;
  };

      // $('#Container').addClass('loading');
      // $timeout(function () {
      //   console.log("I'm now happening...");
      //   $('#Container').removeClass('loading');
      // }, 500);
    }
    //"sortType = 'msrp_price'; sortReverse = !sortReverse"
]);

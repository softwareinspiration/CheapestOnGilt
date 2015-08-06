angular.module('MainCtrl', ['ngAnimate'])

.controller('mainController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

    $scope.sortType     = 'name'; // set the default sort type
    $scope.sortReverse  = false;  // set the default sort order
    $scope.searchItems   = '';     // set the default search/filter term

    $http.get('/giltdata').success(function(data) {
      console.log(data.sales);
      $scope.data = data.sales;
    });

    $scope.setSort = function ($event, sortType) {
      console.log($event);
      if ($scope.sortType === sortType) {
        $scope.sortReverse = !$scope.sortReverse;
      } else {
        $scope.sortType = sortType;
        $scope.sortReverse = false;
      }
    };

      $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };

    $scope.includedStores = [];
    $scope.includeStore = function(store) {
      var i = $.inArray(store, $scope.includedStores);
      if (i > -1) {
        $scope.includedStores.splice(i,1);
      } else {
        $scope.includedStores.push(store);
      }
    };

    $scope.storeFilter = function(store) {
    if ($scope.includedStores.length > 0) {
        if ($.inArray(data.sale_store, $scope.includedStores) < 0) {
            return; }
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

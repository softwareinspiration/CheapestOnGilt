angular.module('MainCtrl', [])

.controller('mainController', ['$scope', function($scope, $http) {

  console.log('okay');
  $scope.message = 'Look at me go 222!';

    $http.get('localhost:1337/').success(function(data) {
      $scope.message = data;
    });

}]);

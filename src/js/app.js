var app = angular.module('giltApp', ['MainCtrl', 'TestService']);

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
});

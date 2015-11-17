'use strict';

app.controller('HomeCtrl', ['$scope', function($scope){
    $scope.content = {};
    $scope.content.data = [];

    for(var i =1; i <= 20; i ++) {
        $scope.content.data.push('item'+ i);
    }

    $scope.content.clone = _.clone($scope.content.data);


    $scope.edit = function(value, index) {
        $scope.content.editIndex = index;
        $scope.content.editValue = value;
        $scope.content.order = '';
    };
}]);
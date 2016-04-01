var app = angular.module('demoApp', []);

app.controller('MainCtrl', function($scope) {

  $scope.$watch("selectedItems",function(newVal, oldVal){
    console.log("new val is "+selectedItems);
  });

  $scope.selectedItems=[];

  $scope.myItems = [
            { idx: 'ASD', name: 'asdfasfas' },
            { idx: 'DEG', name: 'sdfgsdv' },
            { idx: 'ACRE', name: 'wertwert' },
            { idx: 'ASFER', name: 'jkashdfjs' },
            { idx: 'ASDR', name: 'asdf' }
        ];
});

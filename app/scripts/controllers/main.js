'use strict';


app.controller('boardCtrl', function ($scope) {
    $scope.fields = [];
    $scope.boardRows = [];

    $scope.columns = 8;
    $scope.rows = 8;

    //    create fields
    for(var i=1; i<=$scope.columns; i++ ){
        for(var j=1; j<=$scope.rows; j++){
            $scope.fields.push({x: i, y: j, color: "", occupied: false});
        }
    }

    // push fields in array for each column
    for(var i=0; i < $scope.columns; i++){
        $scope.boardRows.push([]);
        for(var j= 0; j < $scope.fields.length; j++){
            if($scope.fields[j].x == i+1){
                $scope.boardRows[$scope.boardRows.length-1].push($scope.fields[j]);
            }
        }
    }
});

app.directive('field', function (){
    return {
        restrict: "E",
        replace: true,
        template: '<div class="field"><i class="fa fa-circle token {{color}}"></i></div>'
    }
});
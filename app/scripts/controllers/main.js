'use strict';


app.controller('boardCtrl', function ($scope) {
    $scope.fields = [];
    $scope.boardRows = [];
    $scope.boardCols = [];

    $scope.columns = 8;
    $scope.rows = 8;
    $scope.playerOneTurn = true;

    //    create fields
    for(var i=1; i<=$scope.columns; i++ ){
        for(var j=1; j<=$scope.rows; j++){
            $scope.fields.push({x: i, y: j, color: "", occupied: false});
        }
    }

    // push fields in array for each column
    for(var i=0; i < $scope.columns; i++){
        $scope.boardRows.push([]);
        $scope.boardCols.push([]);
        for(var j= 0; j < $scope.fields.length; j++){
            if($scope.fields[j].x == i+1){
                $scope.boardRows[$scope.boardRows.length-1].push($scope.fields[j]);
            }
            if($scope.fields[j].y == i+1){
                $scope.boardCols[$scope.boardCols.length-1].push($scope.fields[j]);
            }
        }
    }

    $scope.setToken = function(selectedField){

        var colNumber = selectedField.y - 1;
        var currentCol = $scope.boardCols[colNumber];

        for(var i=currentCol.length; i>=0; i--){

            if(currentCol[i-1].occupied == false){
                var topToken = $scope.boardCols[colNumber][i-1];

                topToken.occupied = true;

                // switch player on each click
                if($scope.playerOneTurn){
                    topToken.color = "player-one";
                    $scope.playerOneTurn = !$scope.playerOneTurn;
                } else {
                    topToken.color = "player-two";
                    $scope.playerOneTurn = !$scope.playerOneTurn;
                }
                return;
            }
        }
    }
});

app.directive('field', function (){
    return {
        restrict: "E",
        scope: {
            occupied: "=",
            color: "=",
            clickField: "&"
        },
        replace: true,
        template: '<div class="field" ng-click="clickField(field)"><i class="fa fa-circle token {{color}}" ng-show="occupied"></i></div>'
    }
});
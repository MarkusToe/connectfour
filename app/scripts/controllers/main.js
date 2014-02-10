'use strict';


app.controller('boardCtrl', function ($scope) {
    $scope.fields = [];
    $scope.boardRows = [];
    $scope.boardCols = [];

    $scope.columns = 8;
    $scope.rows = 8;
    $scope.playerOneTurn = true;
    $scope.gameOver = false;

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

    // put tokens on board
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
                $scope.fourConnected(topToken, $scope.boardRows, $scope.boardCols, $scope.rows, $scope.columns);
                return;
            }
        }
    }

    // check if player has four in a row
    $scope.fourConnected = function(field, rows, columns, rowCount, colCount){
        var i, c, r, counter;

        var x = field.x;
        var y = field.y;

        var checkColor = field.color;

        function alreadyFour(c) {
            if(c >= 4) {
                $scope.gameOver = true;
            }
        }

        //horizontal -----------------------
        counter = 0;
        for(i = 0; i < colCount; i++) {

            if(rows[x-1][i].color === checkColor) {
                counter++;
            }
            else {
                counter = 0;
            }
            alreadyFour(counter);
        }

        //vertical -----------------------
        counter = 0;
        for(i = x; i <= 8 ; i++) {
            if(rows[i-1][y-1].color === checkColor)
            {
                counter++;
            }
            else {
                counter = 0;
            }
            alreadyFour(counter);
        }

        //diagonal right-down -----------------------
        counter = 0;
        r = x;
        c = y;

        // get to upper left corner (as far as possible)
        while(r > 0 && c > 0) {
            r--;
            c--;
        }

        for(i = 0; i < colCount; i++) {

            if(rows[r] && c<colCount) {

                if(rows[r][c].color === checkColor) {
                    counter++;
                }
                else {
                    counter = 0;
                }
                alreadyFour(counter);
                r++;
                c++;

            }
            else {
                break;
            }
        }

        //diagonal left-down -----------------------
        counter = 0;
        r = x;
        c = y;
c
        // get up to right corner (as far as possible)
        while(r > 0 && c < rowCount) {
            r--;
            c++;
        }

        for(i = 0; i < colCount; i++) {
            if(rows[r-1] && c >= 0) {
                if(rows[r-1][c-1].color === checkColor) {
                    counter++;
                }
                else {
                    counter = 0;
                }
                alreadyFour(counter);

                r++;
                c--;
            }
            else {
                break;
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
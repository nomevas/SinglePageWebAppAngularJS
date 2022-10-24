(function () {
    'use strict';
    
    angular.module('LunchCheckApp', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.message = "";
        var messageColor = "red";
        
        $scope.checkIfTooMuch = function() {
            messageColor = "green";
            var items = $scope.lunchMenu?.split(",").filter((item) => item.trim() !== "");

            if (items === undefined || items.length == 0) {
                $scope.message = "Please enter data first";
                messageColor = "red";
            } else if (items.length <= 3) {
                $scope.message = "Enjoy!";
            } else {
                $scope.message = "Too Much!";
            }
        }

        $scope.getMessageStyle = function() {
            return {color: messageColor};
        }
    }
    
})();
    

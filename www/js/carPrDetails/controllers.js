angular.module('carPrDetails.controllers', [])
.controller('CarProtectDetailsCtrl', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarPrDetailsService', // <-- controller dependencies
    function($state, $scope, $stateParams, UserService, CarPrDetailsService) {
      CarService.findAllCarPrCompanies().then(function(cars) {
        console.log(cars.length);
        $scope.carList = cars;
      })
    }
  ]);

/*.controller('CarDetailsCtrl', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarPrDetailsService',
    function($state, $scope, $stateParams, UserService, CarService){
      CarService.findMyCars($stateParams.itemId).then(function(car){
        $scope.carDetails = car;
      })
    }
]);*/

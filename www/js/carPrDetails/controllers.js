angular.module('carPrDetails.controllers', [])
.controller('CarProtectDetailsCtrl', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarPrDetailsService', // <-- controller dependencies
    function($state, $scope, $stateParams, UserService, CarPrDetailsService) {
      CarPrDetailsService.findAllCarPrCompanies().then(function(cars) {
        console.log(cars.length);
        $scope.carPrDetails = cars;
      })
    }
  ])

.controller('CarPrDetails', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarPrDetailsService',
    function($state, $scope, $stateParams, UserService, CarPrDetailsService){
      CarPrDetailsService.findCarPrDetails($stateParams.itemId).then(function(carDtls){
        $scope.carPrDetails = carDtls;
      })
    }
]);

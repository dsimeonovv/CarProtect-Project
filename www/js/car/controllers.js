angular.module('car.controllers', [])
.controller('CarListCtrl', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarService', // <-- controller dependencies
    function($state, $scope, $stateParams, UserService, CarService) {
      CarService.findAllCars().then(function(cars) {
        console.log(cars.length);
        $scope.carList = cars;
      })
    }
  ])

.controller('CarDetailsCtrl', [
    '$state', '$scope', '$stateParams', 'UserService', 'CarService',
    function($state, $scope, $stateParams, UserService, CarService){
      CarService.findMyCars($stateParams.itemId).then(function(car){
        $scope.carDetails = car;
      })
    }
])

.controller('CarCreateCtrl', [
  '$state', '$scope', '$stateParams', 'UserService', 'CarService', 'AppService', // <- controller dependencies
  function($state, $scope, $stateParams, UserService, CarService, AppService){
    $scope.car = {
      brand: "Peugeot",
      model: "307",
      year: 2004,
      engine_litres: "2",
      horse_power: 110,
      car_protect_company: "Olimpik"
    };

    $scope.createCar = function(){
      UserService.currentUser()
        .then(function (_user){
          return CarService.createCar(_user, $scope.car);
        })
        .then(function (car) {
          alert("Car was created!");
          console.log("Successfully add new car: " + JSON.stringify(car));
          $state.go('tab.list');
        });
    };
  }

]);

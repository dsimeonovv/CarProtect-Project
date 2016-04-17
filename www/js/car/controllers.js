angular.module('car.controllers', [])

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

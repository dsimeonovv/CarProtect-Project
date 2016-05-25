angular.module('app.services', [])

    .service('AppService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {


          return {

          /**
           *
           * @param _carParams
           */
          createCar: function (_carParams) {

              var car = new Parse.Car();

              car.set("objectId", _carParams.objectId);
              car.set("brand", _carParams.brand);
              car.set("model", _carParams.model);
              car.set("year", _carParams.year);
              car.set("engine_litres", _carParams.engine_litres);
              car.set("horse_power", _carParams.horse_power);
              car.set("car_protect_company", _carParams.car_protect_company);

          },
        }
      }])
      .factory('Camera', function($q) {
        return {
          getPicture: function(options) {
            var q = $q.defer();
            navigator.camera.getPicture(function(result) {
              q.resolve(result);
            }, function(err) {
              q.reject(err);
            }, options);
            return q.promise;
          }
        }
      });

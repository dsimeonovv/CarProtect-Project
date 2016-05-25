angular.module('car.services', [])


.service('CarService', ['$q', 'ParseConfiguration',
  function($q, ParseConfiguration) {
    return {

      findMyCars: function(_id) {
        var defered = $q.defer();
        var Car = Parse.Object.extend('Car');
        var car = new Parse.Query(Car);
        //car.equalTo("objectId", _id);
        car.get(_id, {
          success: function(car) {
            defered.resolve(car);
            console.log("success");
          },
          error: function(err) {
            defered.reject();
            console.log("no success");
          }
        });
        return defered.promise;
      },

      findAllCars: function() {
      var defered = $q.defer();
      var Car = Parse.Object.extend('Car');
      var car = new Parse.Query(Car);
      car.find({
        success: function(cars) {
          defered.resolve(cars);
        },
        error: function(err) {
          defered.reject(cars);
        }
      });
      return defered.promise;
    },

      createCar: function(_user, carParams) {
        console.log(JSON.stringify(carParams));
        var deffered = $q.defer();
        var Car = Parse.Object.extend('Car');
        var myCar = new Car();

        myCar.set('brand', carParams.brand);
        myCar.set('model', carParams.model);
        myCar.set('year', parseInt(carParams.year));
        myCar.set('engine_litres', carParams.engine_litres);
        myCar.set('horse_power', parseInt(carParams.horse_power));
        myCar.set('car_protect_company', carParams.car_protect_company);
        myCar.set('objectId', carParams.objectId);
        myCar.set('user_id', _user.id);

        var newACL = new Parse.ACL();
        newACL.setWriteAccess(_user.id,  true);
        newACL.setReadAccess("*",  true);

        myCar.setACL(newACL);
        myCar.save(null, {
          success: function(car){
            //defered.resolve(car);
          },
          error: function(car, error){
            alert("Failed to add new car with error code: " + error.message);
            defered.reject(error);
          }
        });
        //return defered.promise;
      }
    }
  }

]);

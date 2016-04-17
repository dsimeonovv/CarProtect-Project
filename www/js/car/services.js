angular.module('car.services', [])


.service('CarService', ['$q', 'ParseConfiguration',
  function($q, ParseConfiguration) {
    return {
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

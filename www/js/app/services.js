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
          
          getProfile: function(_user) {
          var defered = $q.defer();
          var Profile = Parse.Object.extend('Profile');
          var profile = new Parse.Query(Profile);
          profile.equalTo("parent", _user);
          profile.find({
            success: function(profile) {
              if (profile.length == 0) {
                console.log("Profile: Not found. Create New");
                var p = new Profile();
                p.set("parent", _user);
                defered.resolve(p)
              } else {
                console.log("Profile: Found: " + JSON.stringify(profile[0]));
                defered.resolve(profile[0])
              }
              defered.resolve(profile);
            },
            error: function(profile, err) {
              console.log("Profile:  Error: " + JSON.stringify(err));
              defered.reject(profile);
            }

          });
          return defered.promise;
        }
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

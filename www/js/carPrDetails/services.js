angular.module('carPrDetails.services', [])


.service('CarPrDetailsService', ['$q', 'ParseConfiguration',
  function($q, ParseConfiguration) {
    return {

      findMyCars: function(_id) {
        var defered = $q.defer();
        var CarPrDetails = Parse.Object.extend('CarPrDetails');
        var carPrDetails = new Parse.Query(CarPrDetails);
        //car.equalTo("objectId", _id);
        car.get(_id, {
          success: function(carPrDet) {
            defered.resolve(carPrDet);
            console.log("success");
          },
          error: function(err) {
            defered.reject();
            console.log("no success");
          }
        });
        return defered.promise;
      },

      findAllCarPrCompanies: function() {
      var defered = $q.defer();
      var CarPrDetails = Parse.Object.extend('CarPrDetails');
      var carPrDetails = new Parse.Query(CarPrDetails);
      carPrDetails.find({
        success: function(carPrDetls) {
          defered.resolve(carPrDetls);
        },
        error: function(err) {
          defered.reject(carPrDetls);
        }
      });
      return defered.promise;
    },

    }
  }

]);

/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', ['ngFileUpload'])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService', 'AppService',   // <-- controller dependencies
        function ($state, $scope, UserService, AppService) {

            $scope.dataList = ["Kola 1", "Kola 2", "Kola 3"];

            $scope.doLogoutAction = function () {
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

        }])

    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService', 'AppService', 'Camera', 'Upload',    // <-- controller dependencies
        function ($state, $scope, UserService, AppService, Camera, $upload) {

            UserService.currentUser().then(function (_user, _car) {
                $scope.user = _user;
                $scope.car = _car;

                $scope.userParam = {
                    objectId: _user.get("objectId"),
                    username: _user.get("username"),
                    first_name: _user.get("first_name"),
                    last_name: _user.get("last_name"),
                    gender: _user.get("gender"),
                    email: _user.get("email"),
                    age: _user.get("age"),
                    avatar: _user.get("avatar")
                };

            });


        /*$scope.doInsertAction = function () {
          alert("Vliza vuv funkciqta");
          var query =  new Parse.Query("Car");
          query.equalTo("objectId", $scope.userParam.objectId);
          query.find({
            success: function(results) {
              console.log("found a user..");
              $scope.car.add("brand", "Peugeot");

              $scope.car.save(null, {
                success: function(point) {
                  alert("Saved successfully");
                },
                error: function(point, error) {
                  alert("Error saving");
                }
              });
            },
            error: function(results, error) {
                console.log("None found.");
              }
            });
        };*/

        $scope.doUpdateAction = function(){
          $scope.user.set("first_name", $scope.userParam.first_name);
          $scope.user.set("last_name", $scope.userParam.last_name);
          $scope.user.set("email", $scope.userParam.email);
          $scope.user.set("gender", $scope.userParam.gender);
          $scope.user.set("age", $scope.userParam.age);
          $scope.user.set("avatar", $scope.userParam.avatar);

          // Save
          $scope.user.save(null, {
            success: function(point) {
              alert("Saved successfully");
            },
            error: function(point, error) {
              alert("Error saving");
            }
          });
        };

        $scope.getPicture = function(sourceType) {
          console.log("vliza 1");
          //sourceType - 1 - camera, 0 - album
          var options = {
            quality: 75,
            targetWidth: 200,
            targetHeight: 200,
            sourceType: sourceType,
            destinationType: navigator.camera.DestinationType.DATA_URL
          };
          Camera.getPicture(options).then(function(imageData) {
            console.log("vliza");
            $scope.upload("data:image/jpeg;base64," + imageData);
          }, function(err) {
            console.log(err);
          });
        };

        $scope.upload = function(file) {
          $scope.title = "avatar";
          if (file && !file.$error) {
            file.upload = $upload.upload({
              url: "https://api.cloudinary.com/v1_1/kulinski/upload",
              data: {
                upload_preset: "k6xfmhlu",
                tags: 'avatars',
                context: 'photo=' + $scope.title,
                file: file
              }
            }).success(function(data, status, headers, config) {
              $scope.userParam.avatar = data['secure_url'];
              console.log(JSON.stringify(data));
            }).error(function(data, status, headers, config) {
              console.log(JSON.stringify(data));
              alert('Upload failed!');
            });
          };
        }
}])

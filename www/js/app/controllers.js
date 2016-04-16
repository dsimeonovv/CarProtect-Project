/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
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
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            UserService.currentUser().then(function (_user) {
                $scope.user = _user;

                $scope.userParam = {
                    username: _user.get("username"),
                    first_name: _user.get("first_name"),
                    last_name: _user.get("last_name"),
                    gender: _user.get("gender"),
                    email: _user.get("email"),
                    age: _user.get("age")
                };
            });

        $scope.doUpdateAction = function(){
          $scope.user.set("first_name", $scope.userParam.first_name);
          $scope.user.set("last_name", $scope.userParam.last_name);
          $scope.user.set("email", $scope.userParam.email);
          $scope.user.set("gender", $scope.userParam.gender);
          $scope.user.set("age", $scope.userParam.age);
          // Save
          $scope.user.save(null, {
            success: function(point) {
              alert("Saved successfully");
            },
            error: function(point, error) {
              alert("Error save");
            }
          });
        };

        }]);

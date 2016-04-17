angular.module('user.services', [])

    .service('UserService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {

            var parseInitialized = false;


            return {

                /**
                 *
                 * @returns {*}
                 */
                init: function () {

                    debugger;
                    // if initialized, then return the activeUser
                    if (parseInitialized === false){
                        console.log(ParseConfiguration);
                        Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
                        Parse.serverURL = ParseConfiguration.server;
                        parseInitialized = true;
                        console.log("parse initialized in init function");
                    }

                    var currentUser = Parse.User.current();
                    if (currentUser) {
                        return $q.when(currentUser);
                    } else {
                        return $q.reject({error: "noUser"});
                    }

                },
                /**
                 *
                 * @param _userParams
                 */
                createUser: function (_userParams) {

                    var user = new Parse.User();
                    user.set("objectId", _userParams.objectId);
                    user.set("username", _userParams.email);
                    user.set("password", _userParams.password);
                    user.set("email", _userParams.email);
                    user.set("first_name", _userParams.first_name);
                    user.set("last_name", _userParams.last_name);
                    user.set("gender", _userParams.gender);
                    user.set("age", _userParams.age);

                    // should return a promise
                    return user.signUp(null, {});

                },
                /**
                 *
                 * @param _carParams
                 */
                /*createCar: function (_carParams) {

                    var car = new Parse.Car();

                    car.set("objectId", _carParams.objectId);
                    car.set("brand", _carParams.brand);
                    car.set("model", _carParams.model);
                    car.set("year", _carParams.year);
                    car.set("engine_litres", _carParams.engine_litres);
                    car.set("horse_power", _carParams.horse_power);
                    car.set("car_protect_company", _carParams.car_protect_company);

                },*/
                /**
                 *
                 * @param _parseInitUser
                 * @returns {Promise}
                 */
                currentUser: function (_parseInitUser) {

                    // if there is no user passed in, see if there is already an
                    // active user that can be utilized
                    _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

                    console.log("_parseInitUser " + Parse.User.current());
                    if (!_parseInitUser) {
                        return $q.reject({error: "noUser"});
                    } else {
                        return $q.when(_parseInitUser);
                    }
                },
                /**
                 *
                 * @param _user
                 * @param _password
                 * @returns {Promise}
                 */
                login: function (_user, _password) {
                    return Parse.User.logIn(_user, _password);
                },
                /**
                 *
                 * @returns {Promise}
                 */
                logout: function (_callback) {
                    var defered = $q.defer();
                    Parse.User.logOut();
                    defered.resolve();
                    return defered.promise;

                }

            }
        }]);

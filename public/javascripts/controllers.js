angular.module('cs411', ['ngRoute', 'ngCookies'])
    .directive('nameDisplay', function () {
        return {
            scope: true,
            restrict: 'EA',
            template: "<b>This can be anything {{name}}</b>"
        }
    })
    .controller('cs411ctrl', function ($scope, $http, $cookies) {

        //CREATE (POST)
        $scope.createUser = function () {
            if ($scope.dbID) {
                $scope.updateUser($scope.dbID)
            }
            else {
                const request = {
                    method: 'post',
                    url: 'http://localhost:3000/api/db',
                    data: {
                        NickName: $scope.NickName
                    }
                }
                $http(request)
                    .then(function (response) {
                            $scope.inputForm.$setPristine()
                            $scope.NickName = ''
                            $scope.getUsers()
                            console.log(response)
                        },
                        function (error) {
                            if (error.status === 401) {
                                $scope.authorized = false
                                $scope.h2message = "Not authorized to add "
                                console.log(error)
                            }
                        }
                    )
            }
        }
        //READ (GET)
        $scope.getUsers = function () {
            $http.get('http://localhost:3000/api/db')
                .then(function (response) {
                    $scope.users = response.data

                })
        }
        //UPDATE (PUT)
        $scope.setUserUpdate = function (user) {
            $scope.buttonMessage = "Update User"
            $scope.h2message = "Updating "
            $scope.NickName = user.NickName
            $scope.dbID = user._id

        }
        $scope.updateUser = function (userID) {
            const request = {
                method: 'put',
                url: 'http://localhost:3000/api/db/' + userID,
                data: {
                    NickName: $scope.NickName,
                    _id: userID
                }
            }
            $http(request)
                .then(function (response) {
                    $scope.inputForm.$setPristine()
                    $scope.NickName = ''
                    $scope.h2message = "Add user"
                    $scope.buttonMessage = "Add User"
                    $scope.getUsers()
                    $scope.dbID = null
                })

        }

        //DELETE (DELETE)
        $scope.deleteUser = function (_id) {

            const request = {
                method: 'delete',
                url: 'http://localhost:3000/api/db/' + _id,
            }
            $http(request)
                .then(function (response) {
                        $scope.inputForm.$setPristine()
                        $scope.NickName = ''
                        $scope.getUsers()
                    }
                )
        }




        $(document).ready(function () {
            $('.alert-autocloseable-success').hide();
            $('.alert-autocloseable-warning').hide();
            $('.alert-autocloseable-danger').hide();
            $('.alert-autocloseable-info').hide();

            $('#autoclosable-btn-success').click(function() {
                $('#autoclosable-btn-success').prop("disabled", true);
                $('.alert-autocloseable-success').show();

                $('.alert-autocloseable-success').delay(5000).fadeOut( "slow", function() {
                    // Animation complete.
                    $('#autoclosable-btn-success').prop("disabled", false);
                });
            });

            $('#normal-btn-success').click(function() {
                $('.alert-normal-success').show();
            });

            $('#autoclosable-btn-warning').click(function() {
                $('#autoclosable-btn-warning').prop("disabled", true);
                $('.alert-autocloseable-warning').show();

                $('.alert-autocloseable-warning').delay(3000).fadeOut( "slow", function() {
                    // Animation complete.
                    $('#autoclosable-btn-warning').prop("disabled", false);
                });
            });

            $('#normal-btn-warning').click(function() {
                $('.alert-normal-warning').show();
            });

            $('#autoclosable-btn-danger').click(function() {
                $('#autoclosable-btn-danger').prop("disabled", true);
                $('.alert-autocloseable-danger').show();

                $('.alert-autocloseable-danger').delay(5000).fadeOut( "slow", function() {
                    // Animation complete.
                    $('#autoclosable-btn-danger').prop("disabled", false);
                });
            });

            $('#normal-btn-danger').click(function() {
                $('.alert-normal-danger').show();
            });

            $('#autoclosable-btn-info').click(function() {
                $('#autoclosable-btn-info').prop("disabled", true);
                $('.alert-autocloseable-info').show();

                $('.alert-autocloseable-info').delay(6000).fadeOut( "slow", function() {
                    // Animation complete.
                    $('#autoclosable-btn-info').prop("disabled", false);
                });
            });

            $('#normal-btn-info').click(function() {
                $('.alert-normal-info').show();
            });

            $(document).on('click', '.close', function () {
                $(this).parent().hide();
            });
        });
        // API call
        // Use the key find the twitter twits
        $scope.getTwitter = function(input){
            $http.get('http://localhost:3000/twitter/' + input)
                .then(function (response) {
                    $scope.twitter_hide = false
                    $scope.yelp_hide = true
                    $scope.weather_hide = true
                    $scope.APIresult = response.data.statuses
                })
        }

        $scope.getYelp = function(input){
            $http.get('http://localhost:3000/yel/' + input)
                .then(function(response){
                    $scope.APIresult = response.data
                    console.log(response.data)
                    $scope.twitter_hide = true
                    $scope.weather_hide = true
                    $scope.yelp_hide = false
                })

        }

        $scope.getWeather = function(input){
            $http.get('http://localhost:3000/weather/' + input)
                .then(function(response){
                    $scope.APIresult = response.data
                    $scope.twitter_hide = true
                    $scope.yelp_hide = true
                    $scope.weather_hide = false
                })

        }




        $scope.initApp = function ( ) {
            $scope.buttonState = "create"
            $scope.h2message = "Add user"
            $scope.buttonMessage = "Add User"
            $scope.authorized = false
            $scope.showLogin = false
            $scope.getUsers()
            //Grab cookies if present
            let authCookie = $cookies.get('authStatus')
            $scope.authorized = !!authCookie
            $scope.twitter_hide = true
            $scope.weather_hide = true
            $scope.yelp_hide = true
        }

        $scope.logout = function () {
            $http.get('/auth/logout')
                .then(function (response) {
                    $scope.authorized = false
                })
        }
        $scope.login = function () {
            const request = {
                method: 'post',
                url: 'http://localhost:3000/auth/login',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (err) {
                        $scope.authorized = false
                    }
                )
        }

        $scope.register = function () {

            const request = {
                method: 'post',
                url: '/auth/register',
                data: {
                    name: $scope.name,
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(request)
                .then(function (response) {
                        $scope.authorized = true
                        $scope.showLogin = false
                    },
                    function (error) {
                        if (error.status === 401) {
                            $scope.authorized = false
                            $scope.h2message = "Error registering"
                            console.log(error)
                        }
                    }
                )
        }

        $scope.showLoginForm = function () {
            $scope.showLogin = true
        }
        
        $scope.doTwitterAuth = function () {
            var openUrl = '/auth/twitter/'
            //Total hack, this:
            $scope.authorized = true
            window.location.replace(openUrl)

        }

    })
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/:status', {
                templateUrl: '',
                controller: 'authController'
            })
                .when(':status', {
                    templateUrl: '',
                    controller: 'authController'
                })
            .otherwise({
                redirectTo: '/'
            })
        }])


.controller('authController', function ($scope) {

    let authStatus =  $location.search();
console.log(authStatus)
    console.log('In authController')
    $scope.authorized = !!authStatus

})


//This controller handles toggling the display of details in the user list
.controller('listController', function ($scope) {
    $scope.display = false
    $scope.showInfo = function () {
        $scope.display = !$scope.display
    }
})

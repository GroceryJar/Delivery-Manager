'use strict';
define(['application'], function(app) {
    app.register.controller('homeController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {

            function initGeolocation() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, fail);
                } else {
                    alert("Sorry, your browser does not support geolocation services.");
                }
            }

            function success(position) {
                $scope.long = position.coords.longitude;
                $scope.lat = position.coords.latitude;
                showMap();

            }

            function fail() {

            }

            function showMap() {
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();

                var myOptions = {
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                var map = new google.maps.Map(document.getElementById("map"), myOptions);
                directionsDisplay.setMap(map);

                window.points = [];
                window.priorityPoints = [];
                window.myData = [];
                for (var count = 0; count < $scope.myData.length; count++) {

                    window.myData.push({
                        location: $scope.myData[count].address,
                        stopover: true
                    });

                    if ($scope.myData[count].type != "P0") {
                        window.points.push({
                            location: $scope.myData[count].address,
                            stopover: true
                        });
                    }

                    if ($scope.myData[count].type == "P0") {
                        window.priorityPoints.push(count);
                    }
                }

                var request = {
                    origin: new google.maps.LatLng($scope.lat, $scope.long),
                    destination: new google.maps.LatLng($scope.lat, $scope.long),
                    waypoints: window.points,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                window.lat = $scope.lat;
                window.long = $scope.long;

                directionsService.route(request, function(response, status) {
                    var finalPoints = [];
                    for (var i = 0; i < response.routes[0].waypoint_order.length; i++) {
                        finalPoints.push(window.points[i]);
                    }

                    for (var i = 0; i < window.priorityPoints.length; i++) {
                        finalPoints.unshift(myData[window.priorityPoints[i]]);
                    }

                    var oRequest = {
                        origin: new google.maps.LatLng(window.lat, window.long),
                        destination: new google.maps.LatLng(window.lat, window.long),
                        waypoints: finalPoints,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };
                    directionsService.route(oRequest, function(oResponse, oStatus) {
                        if (oStatus == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(oResponse);
                        }
                    });


                });
            }
            $scope.generateMap = function() {
                showMap();
            }

            $scope.trackLocation = function() {
                if ($scope.orderNumber) {
                    $scope.changeRoute('/' + $scope.orderNumber + '/order');
                } else {
                    alert('Enter correct order number');
                }
            }

            $scope.addWallet = function() {
                var change = 0;
                var order = $scope.myData.find(function(item) {
                    return item.orderNumber == $scope.orderNumber;
                });
                if (order) {
                    change = order.changeAmount;
                }
                if ($scope.orderNumber) {
                    $scope.changeRoute('/' + $scope.orderNumber + '/profile/' + change);
                } else {
                    alert('Enter correct order number');
                }
            }

            $scope.changeRoute = function(url, forceReload) {
                $scope = $scope || angular.element(document).scope();
                if (forceReload || $scope.$$phase) { // that's right TWO dollar signs: $$phase
                    window.location = url;
                } else {
                    $location.path(url);
                    $scope.$apply();
                }
            };

            function getChangeAmount(data) {
                var rem = 0;
                data.forEach(function(item) {
                    rem = parseInt(item.price) % 10;
                    if (rem <= 5) {
                        item.changeAmount = 5 - rem;
                    } else {
                        item.changeAmount = 10 - rem;
                    }
                });
                return data;
            };

            function totalChange(data) {
                var sum = 0;
                data.forEach(function(item) {
                    sum += item.changeAmount;
                });
                return sum;
            };

            $scope.myData = [];
            $scope.gridOptions = {
                data: 'myData',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEdit: false,
                columnDefs: [{
                        field: 'orderNumber',
                        displayName: 'Order Number',
                        width: '100px'
                    }, {
                        field: 'customerName',
                        displayName: 'Customer Name',
                        width: '100px'
                    }, {
                        field: 'address',
                        displayName: 'Address',
                        width: '100px',
                        enableCellEdit: true
                    },
                    // {
                    //     field: 'pinCode',
                    //     displayName: 'Pin Code',
                    //     width: '100px'
                    // },
                    {
                        field: 'price',
                        displayName: 'Price (Rs.)',
                        width: '100px'
                    }, {
                        field: 'changeAmount',
                        displayName: 'Change (Rs.)',
                        width: '100px'
                    }, {
                        field: 'productName',
                        displayName: 'Product Name',
                        width: '100px'
                    }, {
                        field: 'paymentStatus',
                        displayName: 'Payment Status',
                        width: '100px'
                    }, {
                        field: 'phone',
                        displayName: 'Phone',
                        width: '100px'
                    }, {
                        field: 'type',
                        displayName: 'Priority',
                        width: '100px'
                    }, {
                        field: 'dateOfOrder',
                        displayName: 'Date Of Order',
                        width: '100px'
                    }
                ]
            };

            // Send ajax request on page load and fetch user related data
            var init = (function() {
                ajaxService.get({
                    url: "/data/home/home.json"
                }).then(function(response) {
                    $scope.myData = getChangeAmount(response.data);
                    $scope.totalChange = totalChange($scope.myData);
                    initGeolocation();
                });
            })();
        }
    ])
});
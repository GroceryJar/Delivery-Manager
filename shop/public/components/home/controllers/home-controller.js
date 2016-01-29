'use strict';
define(['application'], function(app) {
    app.register.controller('homeController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {

            function initGeolocation()
            {
                if( navigator.geolocation )
                {
                    navigator.geolocation.getCurrentPosition( success, fail );
                }
                else
                {
                    alert("Sorry, your browser does not support geolocation services.");
                }
            }

            function success(position)
            {
                $scope.long = position.coords.longitude;
                $scope.lat = position.coords.latitude;
                showMap();

            }

            function fail()
            {

            }

            function showMap() {
                var directionsService = new google.maps.DirectionsService();
                var directionsDisplay = new google.maps.DirectionsRenderer();

                var myOptions = {
                    zoom:7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                var map = new google.maps.Map(document.getElementById("map"), myOptions);
                directionsDisplay.setMap(map);

                var points = [];
                for(var count = 0; count < $scope.myData.length; count++) {
                    points.push({
                        location: $scope.myData[count].address,
                        stopover:true
                    });
                }

                var request = {
                    origin: new google.maps.LatLng($scope.lat, $scope.long),
                    destination: new google.maps.LatLng($scope.lat, $scope.long),
                    waypoints: points,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                };

                directionsService.route(request, function(response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {

                        directionsDisplay.setDirections(response);
                    }
                });
            }

            $scope.myData = [];
            $scope.gridOptions = {
                data: 'myData',
                enableCellSelection: true,
                enableRowSelection: false,
                enableCellEdit: false,
                columnDefs: [
                    {
                        field: 'customerName',
                        displayName: 'Customer Name',
                        width: '100px'
                    },
                    {
                        field: 'address',
                        displayName: 'Address',
                        width: '100px'
                    },
                    {
                        field: 'pinCode',
                        displayName: 'Pin Code',
                        width: '100px'
                    },
                    {
                        field: 'price',
                        displayName: 'Price',
                        width: '100px'
                    },
                    {
                        field: 'productName',
                        displayName: 'Product Name',
                        width: '100px'
                    },
                    {
                        field: 'paymentStatus',
                        displayName: 'Payment Status',
                        width: '100px'
                    },
                    {
                        field: 'phone',
                        displayName: 'Phone',
                        width: '100px'
                    },
                    {
                        field: 'type',
                        displayName: 'Delivery Type',
                        width: '100px'
                    },
                    {
                        field: 'dateOfOrder',
                        displayName: 'Date Of Order',
                        width: '100px'
                    },
                    {
                        field: 'orderNumber',
                        displayName: 'Order Number',
                        width: '100px'
                    }
                ]
            };

            // Send ajax request on page load and fetch user related data
            var init = (function(){
                 ajaxService.get({
                    url: "/data/home/home.json"
                }).then(function(response) {
                    $scope.myData = response.data;
                     initGeolocation();
                });
            })();
        }
    ])
});
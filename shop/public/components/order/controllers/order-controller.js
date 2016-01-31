'use strict';
define(['application', 'socketio'], function(app, io) {
    app.register.controller('orderController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {
            // Send ajax request on page load and fetch user related data
            // User Infomation
            var currentUserInfo = null;
            var users = {};

            // Google Maps UI
            var map = null;
            var infowindow = null;
            var refreshTimeout = null;

            function userLocationUpdate(userInfo){

                if(!users[userInfo.id]) users[userInfo.id] = { id: userInfo.id };

                users[userInfo.id].name = userInfo.name;
                users[userInfo.id].latitude  = userInfo.latitude;
                users[userInfo.id].longitude = userInfo.longitude;
                users[userInfo.id].timestamp = new Date().getTime()
                refreshMarkers();
            }

            function refreshMarkers(){
                if (!map) return;
                if (currentUserInfo && !currentUserInfo.movedMapCenter && currentUserInfo.timestamp) {
                    $('#user-name').val(currentUserInfo.name);
                    $('#user-name').bind('keyup', function() {
                        currentUserInfo.name = $('#user-name').val();
                    })
                    currentUserInfo.movedMapCenter = true;
                    map.setCenter(new google.maps.LatLng(
                        currentUserInfo.latitude, currentUserInfo.longitude));
                }

                for (var id in users) {
                    var userInfo = users[id];

                    if(userInfo.marker){

                        // If we havn't received any update from the user
                        //  We remove the marker of missing user
                        if( userInfo.id != currentUserInfo.id &&
                            userInfo.timestamp + 1000*30 < new Date().getTime() ){
                            userInfo.marker.setMap(null);
                            delete users[id];
                            continue;
                        }

                    }else{

                        // Create a marker for the new user
                        var marker = new google.maps.Marker({ map:map });
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent(marker.getTitle())
                            infowindow.open(map, marker);
                        });

                        userInfo.marker = marker;
                    }

                    //Move the markers
                    userInfo.marker.setTitle(userInfo.name);
                    userInfo.marker.setPosition(
                        new google.maps.LatLng(userInfo.latitude, userInfo.longitude));
                }

                $('#user-number').text(Math.max(Object.keys(users).length-1,0) +'')

                // Refresh the markers every 20 seconds
                clearTimeout(refreshTimeout)
                refreshTimeout = setTimeout(refreshMarkers, 1000*20);
            }

            function mapInitialize() {
                map = new google.maps.Map(document.getElementById("map-canvas"), {
                    zoom: 10,
                    center: new google.maps.LatLng(17.3700, 78.4800)
                });
                infowindow = new google.maps.InfoWindow({ content: 'Test' });
                google.maps.event.addListener(map, 'click', function() {
                    infowindow.close(map);
                });
                refreshMarkers();
            }

            $scope.move_to_otheruser = function(){
                var ids = Object.keys(users)
                ids.slice(ids.indexOf(currentUserInfo.id),1);

                var random_user_id = ids[Math.floor(ids.length * Math.random())]
                var userInfo = users[random_user_id];
                map.setCenter(new google.maps.LatLng(
                    userInfo.latitude, userInfo.longitude));

                infowindow.setContent(userInfo.name)
                infowindow.open(map, userInfo.marker);
            }

            function initLocationSharing(location_callback, error_callback){

                //For generating a random unique ID
                function guid() {
                    function s4() { return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16).substring(1);
                    };

                    return s4() + s4() + '-' + s4() + '-' + s4() + s4();
                }

                var userInfo = {
                    id: guid(),
                    name: 'Anonymous' + (navigator.platform? ' ('+navigator.platform+')':'')
                }

                // ================================
                // Setup Socket IO
                // ================================
                var socket = io.connect('/');
                socket.on('connect', function () {
                    socket.on('location', function(location){
                        if(location.id != userInfo.id) {
                            location_callback(location);
                        }
                    })
                });

                // ================================
                // Setup Geolocation
                // ================================
                if (!navigator.geolocation) {
                    return userInfo;
                }

                function geo_success(position) {
                    var longitude = position.coords.longitude;
                    userInfo.latitude  = position.coords.latitude;
                    userInfo.longitude = position.coords.longitude;
                    location_callback(userInfo);
                    sendLocation();
                }

                function geo_error() {
                    error_callback();
                }

                var sendLocationTimeout = null;
                function sendLocation(){
                    socket.emit('location', userInfo);
                    clearTimeout(sendLocationTimeout);
                    sendLocationTimeout = setTimeout(sendLocation, 1000*5);
                }

                var geo_options = { enableHighAccuracy: true };
                navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
                navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);

                return userInfo;
            }
            var init = (function(){
                mapInitialize();
                currentUserInfo = initLocationSharing(userLocationUpdate);
            })();
        }
    ])
});
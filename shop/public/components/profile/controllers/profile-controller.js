'use strict';
define(['application', 'socketio'], function(app, io) {
    app.register.controller('profileController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {
            $scope.amount = parseInt(window.location.pathname.split('/')[3]);
        }
    ])
});
'use strict';
define(['application'], function(app) {
    app.register.controller('homeController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {

            // Send ajax request on page load and fetch user related data
            var init = (function(){
                 ajaxService.get({
                    url: "getData",
                    data: {"name": "home"}
                }).then(function(response) {
                    $scope.data = response.data;
                });
            })();
        }
    ])
});
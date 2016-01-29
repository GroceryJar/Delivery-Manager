define(["application"], function(app) {
    return app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', '$compileProvider', '$provide','$controllerProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider, $compileProvider, $provide,$controllerProvider) {

            //Change default views and controllers directory
            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                service: $provide.service
            };

            //inject our ajaxInterceptor to the $httpProvider
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

            // For any unmatched url, redirect to Application Context url
            $urlRouterProvider.otherwise("/");
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            function resolveDependencies($q, $rootScope, dependency) {
                var defer = $q.defer();
                require(dependency, function() {
                    defer.resolve();
                    $rootScope.$apply();
                });
                return defer.promise;
            }

            $stateProvider
                .state('index', {
                    url: '/',
                    views: {
                        //overall structre of page is decided by pageContent
                        //headerView, layoutView and footerView are the parts of the page
                        "pageContent": {
                            templateUrl: "components/common/templates/main-view.html"
                        },
                        "headerView@index": {
                            templateUrl: "components/common/templates/header.html"
                        },
                        "layoutView@index": {
                            templateUrl: "components/home/templates/view.html",
                            controller: "homeController as hc",
                            access: {restricted: false},
                            resolve: {
                                load: ["$q", "$rootScope", function($q, $rootScope){
                                        var dependency = ["homeCtrl"];
                                        return resolveDependencies($q, $rootScope, dependency);
                                }]
                            }
                        },
                        "footerView@index": {
                            templateUrl: "components/common/templates/footer.html"
                        }
                    }
                });
        }
    ])
    .run(function ($rootScope, $location, $route, authService) {
      $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.access.restricted && authService.isLoggedIn() === false) {
          $location.path('/login');
        }
      });
    });
});
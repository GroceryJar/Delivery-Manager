define([], function () {
    return angular.module('ajaxService', []).service("ajaxService", ["$http",
        function ($http) {

            this.get = function (obj) {
                return $http({
                    method: "get",
                    url: obj.url + "?r="+Math.random(),
                    params: obj.data
                });
            };

            this.put = function (obj) {
                
                return $http({
                    method: "put",
                    url: obj.url,
                    data: obj.data
                });
            };

            this.post = function (obj) {
                return $http({
                    method: "post",
                    url: obj.url,
                    data: obj.data,
                    async: true
                });
            };
        }
    ]);
});
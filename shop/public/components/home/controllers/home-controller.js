'use strict';
define(['application'], function(app) {
    app.register.controller('homeController', ["$scope", "ajaxService", "$timeout",
        function($scope, ajaxService, $timeout) {
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
                     debugger;
                    $scope.myData = response.data;
                });
            })();
        }
    ])
});
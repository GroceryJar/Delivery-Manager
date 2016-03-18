'use strict';

require.config({
	baseUrl: 'components/',
	waitSeconds: 20,
	paths:{

		//Include all the Controllers
		headerCtrl:"common/controllers/header-controller",
		homeCtrl: "home/controllers/home-controller",
		orderCtrl: "order/controllers/order-controller",
		profileCtrl: "profile/controllers/profile-controller",
		
		//Vendor files
		socketio: "vendors/socket.io",
		jquery: "vendors/jquery/jquery",
		bootstrap: "vendors/bootstrap/bootstrap",
		ngGrid: "vendors/angular/ng-grid.debug",
		bootstrapSelect: "vendors/bootstrap/bootstrap-select",
		angular: "vendors/angular/angular",
		angularUIRoute: "vendors/angular/angular-ui-router",
		ngSanitize: "vendors/angular/angular-sanitize",
		angularRoute: "vendors/angular/angular-route.min",

		myRoutes: "common/route",
		application : "common/app",
		ajaxService : "common/services/ajax-service",
		authService: "common/services/authService"
	},
	shim:{
		'application':{
			deps: ['jquery', 'socketio', 'angular', "angularUIRoute","ngSanitize", "angularRoute", "ngGrid"]
		},
		'socketio': {
			exports: 'io'
		},
		'ajaxService':{
			deps: ['angular']
		},
		'authService':{
			deps: ['angular']
		},
		'bootstrap': {
			deps: ['jquery']
		},
		'angular': {
			deps: ['jquery']
		},
		'angularUIRoute' :{
			deps: ['angular']
		},
		'ngSanitize':{
			deps:['angular']
		},
		'angularRoute':  {
			deps: ['angular']	
		},
		'ngGrid': {
			deps: ['angular', 'jquery']
		}
	}
});

// Project level dependencies
require(["application", "socketio", "myRoutes", "jquery", "bootstrap", "bootstrapSelect"],
		function(app, io, routes){
			var $html = angular.element(document.getElementsByTagName('body')[0]);

			angular.element().ready(function(){
				var injector = angular.bootstrap($html, [app['name']]);
			});
		}
	);
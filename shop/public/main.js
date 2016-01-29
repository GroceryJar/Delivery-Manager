'use strict';

require.config({
	baseUrl: 'components/',
	waitSeconds: 20,
	paths:{

		//Include all the Controllers
		headerCtrl:"common/controllers/header-controller",
		homeCtrl: "home/controllers/home-controller",
		categoryCtrl: "category/controllers/category-controller",
		listingCtrl: "listing/controllers/listing-controller",
		itemCtrl: "item/controllers/item-controller",
		loginCtrl: "login/controllers/login-controller",
		registerCtrl: "login/controllers/register-controller",
		logoutCtrl: "login/controllers/logout-controller",
		
		//Vendor files
		jquery: "vendors/jquery/jquery",
		bootstrap: "vendors/bootstrap/bootstrap",
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
			deps: ['jquery','angular', "angularUIRoute","ngSanitize", "angularRoute"]
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
		}
	}
});

// Project level dependencies
require(['application', "myRoutes", "jquery", "bootstrap", "bootstrapSelect"],
		function(app, routes){
			var $html = angular.element(document.getElementsByTagName('body')[0]);

			angular.element().ready(function(){
				var injector = angular.bootstrap($html, [app['name']]);
			});
		}
	);
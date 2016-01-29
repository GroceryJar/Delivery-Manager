define([ 
	"angularUIRoute", 
	"ajaxService",
	"authService" 
	], 
	function(){
		return angular.module("app", [
			"ui.router",
			"ajaxService",
			"authService",
			"ngSanitize",
			"ngRoute",
			"ngGrid"
			]);
});
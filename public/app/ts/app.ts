// Application
//////////////////////////////////////////////////////////////////////

var app = angular.module('survidle', [
	'mgcrea.ngStrap',
]);

// Controllers
//////////////////////////////////////////////////////////////////////

app.controller('GameController', Controllers.GameController);
app.controller('CraftingController', Controllers.CraftingController);
app.controller('NavigationController', Controllers.NavigationController);

// Directives
//////////////////////////////////////////////////////////////////////

app.directive('status', Directives.Status.instance);
app.directive('recipe', Directives.Recipe.instance);

// Filters
//////////////////////////////////////////////////////////////////////

app.filter('title', Filters.Title);

//////////////////////////////////////////////////////////////////////
////////////////////////////// BOOTING ///////////////////////////////
//////////////////////////////////////////////////////////////////////

app.run(function ($http: ng.IHttpService, $rootScope) {
	var data = 'public/app/json';

	// Fetch recipes
	$http.get(data + '/recipes.json').then(function (response) {
		$rootScope.recipes = response.data;
	});

	// Fetch events
	$http.get(data + '/enemies.json').then(function (response) {
		$rootScope.enemies = response.data;
	});

	// Fetch events
	$http.get(data + '/events.json').then(function (response) {
		$rootScope.events = response.data;
	});

});

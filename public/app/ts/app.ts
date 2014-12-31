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

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
app.controller('TechnologiesController', Controllers.TechnologiesController);

// Directives
//////////////////////////////////////////////////////////////////////

app.directive('status', Directives.Status.instance);
app.directive('recipe', Directives.Recipe.instance);
app.directive('technology', Directives.Technology.instance);

// Services
//////////////////////////////////////////////////////////////////////

app.factory('items', Services.ItemsFactory.instance);

// Filters
//////////////////////////////////////////////////////////////////////

app.filter('title', Filters.Title);
app.filter('filterByType', Filters.Type);

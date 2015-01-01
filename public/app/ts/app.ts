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
app.directive('technology', Directives.Technology.instance);

// Services
//////////////////////////////////////////////////////////////////////

app.service('items', Services.ItemsFactory);
app.service('technologyTree', Services.TechnologyTree);

// Filters
//////////////////////////////////////////////////////////////////////

app.filter('title', Filters.Title);
app.filter('filterByType', Filters.Type);

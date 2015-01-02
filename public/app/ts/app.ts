// Application
//////////////////////////////////////////////////////////////////////

var app = angular.module('survidle', [
	'mgcrea.ngStrap.tooltip',
	'ngRoute',
	'ngAnimate',
]);

// Controllers
//////////////////////////////////////////////////////////////////////

app.controller('GameController', Controllers.GameController);
app.controller('CraftingController', Controllers.CraftingController);
app.controller('MapController', Controllers.MapController);
app.controller('ChangelogController', Controllers.ChangelogController);

// Directives
//////////////////////////////////////////////////////////////////////

app.directive('status', Directives.Status.instance);
app.directive('recipe', Directives.Recipe.instance);
app.directive('technology', Directives.Technology.instance);

// Services
//////////////////////////////////////////////////////////////////////

app.service('encounters', Services.EncountersManager);
app.service('game', Services.Game);
app.service('items', Services.ItemsFactory);
app.service('logs', Services.LogsHandler);
app.service('saves', Services.SaveHandler);
app.service('technologyTree', Services.TechnologyTree);
app.service('world', Services.World);

// Filters
//////////////////////////////////////////////////////////////////////

app.filter('title', Filters.Title);
app.filter('filterByType', Filters.Type);

//////////////////////////////////////////////////////////////////////
//////////////////////////// CONFIGURATION ///////////////////////////
//////////////////////////////////////////////////////////////////////

app.config(function($animateProvider: ng.IAnimateProvider) {
	$animateProvider.classNameFilter(/ng-animate/);
});

angular.module('survidle').config(function ($routeProvider: ng.route.IRouteProvider) {
	var templates = 'public/app/templates/panes';

	// Meta routes
	//////////////////////////////////////////////////////////////////////

	$routeProvider.when('/changelog', {
		controller : 'ChangelogController',
		templateUrl: templates + '/changelog.html',
	});

	// Game routes
	//////////////////////////////////////////////////////////////////////

	$routeProvider.when('/scenery', {
		order      : 1,
		key        : 'scenery',
		label      : 'The Forest',
		unlock     : true,
		templateUrl: templates + '/scenery.html',
	});

	$routeProvider.when('/map', {
		order      : 2,
		key        : 'map',
		label      : 'Map',
		unlock     : 'craftcabin',
		templateUrl: templates + '/map.html',
	});

	$routeProvider.when('/encounters', {
		order      : 3,
		key        : 'encounters',
		label      : 'Encounters',
		unlock     : 'lookAround',
		templateUrl: templates + '/encounters.html',
	});

	$routeProvider.when('/technologies', {
		order      : 4,
		key        : 'technologies',
		label      : 'Technology Tree',
		unlock     : 'craftcabin',
		templateUrl: templates + '/technologies.html',
	});

	$routeProvider.otherwise({
		redirectTo: '/scenery',
	})

});

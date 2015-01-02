module Controllers {
	export class GameController {

		/**
		 * @param $scope
		 */
		constructor(
			public $rootScope,
			public $scope,
			public $http: ng.IHttpService,
			public items: Services.ItemsFactory,
			public logs: Services.LogsHandler,
			public game: Services.Game,
			public $route: ng.route.IRouteService
		) {
			$rootScope.$route = $route;
			$rootScope.game = this.game;
			$scope.Math = Math;

			// Load core data
			this.loadDataOnScope('items');
			this.loadDataOnScope('actions');
			this.loadDataOnScope('enemies');
			this.loadDataOnScope('technologies');
			this.loadDataOnScope('events');

			// Restore save
			this.$rootScope.$watch('events', (events) => {
				if (events) {
					this.game.bootWorld();
					this.game.load();
					this.logs.events = events;
				}
			});
		}

		/**
		 * Get the routes available
		 */
		getAvailableRoutes(): ng.route.IRoute[] {
			return _.values(this.$route.routes);
		}

		/**
		 * Check if the game is booted
		 */
		isBooted(): boolean {
			return typeof this.$rootScope.events !== 'undefined';
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Load some data from JSON onto the root scope
		 */
		loadDataOnScope(data: string) {
			this.$http.get('public/app/json/' + data + '.json').then((response) => {
				this.$rootScope[data] = response.data;
			});
		}

	}
}

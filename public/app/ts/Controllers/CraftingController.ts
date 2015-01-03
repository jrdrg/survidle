module Controllers {
	export class CraftingController {

		constructor(public $scope, public crafting: Services.Crafting) {
			$scope.isUnlocked = this.crafting.isUnlocked.bind(this.crafting);
			$scope.crafting = this.crafting;
		}

	}
}

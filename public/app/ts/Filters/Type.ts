module Filters {
	export class Type {

		constructor() {
			return function (input: any, types: string[]) {
				return _.filter(input, function (item: Entities.Item) {
					return types.indexOf(item.type) !== -1;
				});
			};
		}

	}
}

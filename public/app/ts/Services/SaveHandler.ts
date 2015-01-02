module Services {
	export class SaveHandler {

		/**
		 * Save the game
		 */
		save(state) {
			localStorage.setItem('survidle', JSON.stringify(state));
		}

		/**
		 * Restore the data from localStorage
		 */
		load(): any {
			var state = JSON.parse(localStorage.getItem('survidle'));
			if (!state) {
				return;
			}

			return state;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Restore properties on an object
		 */
		restoreProperties(object, properties, modifiers?: any) {
			_.each(properties, (value: any, key: string) => {
				if (modifiers && typeof modifiers[key] !== 'undefined') {
					value = modifiers[key](value);
				}

				object[key] = value;
			});
		}

	}
}

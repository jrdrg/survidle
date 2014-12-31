interface Recipe {
	key: string;
	name: string;
	description: string;

	// Options
	required?: string;
	multiple?: boolean;

	// Statistics
	ingredients: any;
	skills?: any;
	revenues?: any;
}

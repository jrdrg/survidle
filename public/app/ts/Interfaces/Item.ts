interface Item {
	key: string;
	name: string;
	description: string;

	// Options
	required?: string;
	multiple?: boolean;

	// Statistics
	quantity?: number;
	ingredients?: any;
	skills?: any;
	revenues?: any;
}

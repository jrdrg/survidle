interface Action {
	label: string;
	method: string;

	// Conditions
	unlock?: string;
	condition?: string;
	once?: boolean;
}

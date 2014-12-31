interface Action {
	label: string;
	method: string;
	unlock?: string;
	condition?: string;
	once?: boolean;
}

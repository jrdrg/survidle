module.exports = {
	options: {
		//sourceMap: true,
	},

	css: {
		files: {
			'<%= paths.compiled.css %>/styles.css': [
				'<%= files.css %>',
			],
		},
	},
	js: {
		files: {
			'<%= paths.compiled.js %>/scripts.js': [
				'<%= components %>/easystarjs/bin/easystar-0.1.13.min.js',
				'<%= components %>/jquery/dist/jquery.js',
				'<%= components %>/angular/angular.js',
				'<%= components %>/angular-animate/angular-animate.js',
				'<%= components %>/angular-route/angular-route.js',
				'<%= components %>/angular-filter/dist/angular-filter.js',
				'<%= components %>/angular-ui-bootstrap-bower/ui-bootstrap.js',
				'<%= components %>/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
				'<%= components %>/angular-once/once.js',
				'<%= components %>/chance/chance.js',
				'<%= components %>/lodash/dist/lodash.js',
				'<%= components %>/markdown/lib/markdown.js',
				'<%= components %>/moment/moment.js',
				'<%= paths.original.js %>/Abstracts/HasInventory.js',
				'<%= files.js %>',
				'<%= paths.original.js %>/app.js',
				'<%= paths.original.js %>/routes.js',
			],
		},
	}
};

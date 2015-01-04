module.exports = function (config) {
	config.set({

		// Files
		basePath  : '../',
		files     : [
			'public/components/angular/angular.js',
			'public/components/angular-mocks/angular-mocks.js',
			'public/components/angular-animate/angular-animate.js',
			'public/components/angular-route/angular-route.js',
			'public/components/angular-filter/dist/angular-filter.js',
			'public/components/angular-ui-bootstrap-bower/ui-bootstrap.js',
			'public/components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
			'public/components/angular-once/once.js',
			'public/components/chance/chance.js',
			'public/components/lodash/dist/lodash.js',
			'public/components/markdown/lib/markdown.js',
			'public/components/moment/moment.js',
			'public/app/js/Abstracts/HasInventory.js',
			'public/app/js/**/*.js',
			'tests/**/*.coffee'
		],

		logLevel: config.LOG_INFO,
		autoWatch: true,

		// Plugins
		frameworks: ['jasmine'],
		plugins   : [
			'karma-coffee-preprocessor',
			'karma-phantomjs-launcher',
			'karma-coverage',
			'karma-jasmine'
		],
		browsers  : [
			'PhantomJS'
		],

		// Coverage
		preprocessors   : {
			'public/app/js/**/*.js': ['coverage'],
			'tests/**/*.coffee': ['coffee']
		},
		reporters       : ['progress', 'coverage'],
		coverageReporter: {
			type: 'html',
			dir : 'tests/coverage/',
		},

	});
};

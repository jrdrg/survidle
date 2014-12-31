module.exports = {
	options: {
		livereload : true,
		interrupt  : true,
	},

	grunt: {
		files: ['Gruntfile.js', '<%= grunt %>/**/*'],
		tasks: 'default',
	},
	img: {
		files: '<%= paths.original.img %>/**/*',
		tasks: 'copy',
	},
	js: {
		files: ['index.html', '<%= files.ts %>', '<%= paths.original.json %>/**/*', '<%= paths.original.templates %>/**/*'],
		tasks: 'js',
	},
	css: {
		files: '<%= files.sass %>',
		tasks: 'css',
	},
};

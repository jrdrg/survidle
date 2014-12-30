module.exports = function(grunt) {

	////////////////////////////////////////////////////////////////////
	/////////////////////////////// COMMANDS ///////////////////////////
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('default', 'Build assets for local', [
		'concurrent:build',
	]);

	grunt.registerTask('rebuild', 'Rebuild all assets from scratch', [
		'concurrent:clean',
		'concurrent:build',
	]);

	grunt.registerTask('production', 'Build assets for production', [
		'concurrent:images',
		'rebuild',
		'ngAnnotate',
		'useminPrepare',
		'ngtemplates',
		'concat',
		'copy',
		'minify',
		'usemin',
	]);

	// Flow
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('minify', 'Minify the files', [
		'cssmin',
		'uglify'
	]);

	grunt.registerTask('lint', 'Lint the files', [
		'tslint',
		'scsslint',
		'csslint',
		'csscss',
	]);

	// By filetype
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('md', 'Build contents', [
		'newer:concat:md',
		'newer:markdown',
		'newer:prettify',
	]);

	grunt.registerTask('js', 'Build scripts', [
		'concurrent:js'
	]);

	grunt.registerTask('css', 'Build stylesheets', [
		'newer:compass:compile',
		'newer:autoprefixer',
	]);

}

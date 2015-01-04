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
		'ngtemplates',
		'concat',
		'copy',
		'minify',
	]);

	// Flow
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('minify', 'Minify the files', [
		'cssmin',
		'uglify'
	]);

	grunt.registerTask('images', 'Recompress images', [
		'newer:imagemin',
	]);

	grunt.registerTask('lint', 'Lint the files', [
		'tslint',
		'scsslint',
		'csslint',
		'csscss',
	]);

	// By filetype
	////////////////////////////////////////////////////////////////////

	grunt.registerTask('js', 'Build scripts', [
		'concurrent:js',
		'concat:js',
	]);

	grunt.registerTask('css', 'Build stylesheets', [
		'newer:compass:compile',
		'newer:autoprefixer',
		'concat:css',
	]);

}

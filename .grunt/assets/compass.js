module.exports = {
	options: {
		appDir            : "<%= app %>/",
		cssDir            : "css",
		generatedImagesDir: "img/sprite/generated",
		imagesDir         : "img",
		outputStyle       : 'nested',
		noLineComments    : true,
		relativeAssets    : true,
		assetCacheBuster  : false,
		require           : ['sass-globbing', 'breakpoint'],
	},

	/**
	 * Cleans the created files and rebuilds them
	 */
	clean: {
		options: {
			clean: true,
		}
	},

	/**
	 * Compile Sass files
	 */
	compile: {
		options: {
			sourcemap: true,
		},
		src    : '<%= files.sass %>'
	},
};

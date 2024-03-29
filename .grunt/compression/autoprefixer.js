module.exports = {
	options: {
		browsers : ['> 1%', 'last 2 versions'],
		map      : true,
	},

	dist: {
		expand : true,
		cwd    : '<%= paths.original.css %>',
		src    : '*.css',
		dest   : '<%= paths.original.css %>',
		ext    : '.css'
	}
};
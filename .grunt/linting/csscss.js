module.exports = {
	options: {
		compass            : true,
		ignoreSassMixins   : true,
		minMatch           : 5,
		failWhenDuplicates : false,
		verbose            : true,
	},

	dist: {
		src: '<%= files.css %>'
	}
};
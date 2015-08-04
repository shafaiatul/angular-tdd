//npm method cares about export
module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
		files: [ //these are the file karma will load
			'bower_components/angular/angular.js',
			'bower_components/chai/chai.js',

			'app/**/*.js',

			'test/**/*.js'
		],
	})
}
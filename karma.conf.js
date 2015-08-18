//npm method cares about export
module.exports = function (config) {
	config.set({
		browsers: ['PhantomJS'],
		frameworks: ['mocha'],
    preprocessors: {
      'app/**/*.js': ['coverage']
    },
    coverageReporter: {
      includeAllSources: true,
      reporters: [{
        type: 'html',
        dir: 'test/coverage',
        subdir: '.'
      },{
        type: 'text'
      }]
    },
		files: [ //these are the file karma will load
			'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
			'bower_components/chai/chai.js',

			'app/**/*.js',

			'test/*.js'
		]
	})
}

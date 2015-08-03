var gulp = require('gulp');
var browserSync = require('browser-sync'); //it serves live updates in chrome in multiple devices

//I will create a simple task to serve the task 'app'.
gulp.task('serve', function () {
	//I have browserSync going, I will init it and pass it a configuration. I will pass few flags to init
	browserSync.init ({
		notify: false, // it will affect the output of browserSync
		port: 8080,
		server: {
			baseDir: ['app'], //I will serve up the base directory which is app directory
			//For each object in the routes- both key and value mattters
			//lets set our routes for bower_components to serve those components which have angular in it.
			routes: {
				'/bower_components': 'bower_components'
			}
		}		
	})
	// Watch for change in any file  (Everytime I update the files browserSync will restart.)
	gulp.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
});
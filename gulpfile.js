var gulp = require('gulp');
var browserSync = require('browser-sync'); //it serves live updates in chrome in multiple devices
var chokidar = require('chokidar');
var karma = require('karma').server;
var server = require('gulp-live-server');

gulp.task('server', function () {
	var live = new server('server.js');
	live.start();
});



//I will create a simple task to serve the task 'app'.
gulp.task('serve', ['server'], function () { //make the server task dependency of serve task
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
	chokidar.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
});


//test-browser
gulp.task('test-browser', function () {
	karma.start({ //pass it the configuration file which is karma.conf.js
		//dirname is the variable which automatically directory whereever the gulp file is running
		configFile: __dirname +'/karma.conf.js',
		singleRun: true, //I want it to run once
		//pass a array of reporters
		reporters: ['mocha','coverage']
	},function () {
    done();
  })
});

//Serve Coverage
gulp.task('serve-coverage',['test-browser'], function () {
  browserSync.init ({
    notify: false,
    port: 7777,
    server: {
      baseDir: ['test/coverage']
    }
  })
  chokidar.watch(['app/**/*.*'])
    .on('change', browserSync.reload);
});

//Serving the test
gulp.task('serve-test', function () {
	browserSync.init ({
		notify: false,
		port: 8081,
		server: {
			baseDir: ['test', 'app'],
			routes: {
				'/bower_components': 'bower_components'
			}
		}
	})
	chokidar.watch(['app/**/*.*'])
		.on('change', browserSync.reload);
});

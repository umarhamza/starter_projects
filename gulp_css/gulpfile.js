var gulp 			= require('gulp');
var browserSync 	= require('browser-sync').create();

// Gulp BrowserSync Task
gulp.task('serve', function() {

			// initialise browserSync
			browserSync.init({

						// add a server dir
						server: {
							baseDir: "./"
						}// server

						// add a proxy address to your server
						//proxy: "mywebsite.dev",

						// select a default browser
						//browser: ["chrome"]

			});// browser sync init

			// watch files and when it changes, run tasks
	  	gulp.watch('./_/css/*.css').on('change', browserSync.reload);
	  	gulp.watch('./_/js/*.js').on('change', browserSync.reload);
	  	gulp.watch('*.html').on('change', browserSync.reload);

});// gulp browsersync task

// Create Gulp Default Task
gulp.task('default', ['serve']);

var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var sourcemaps 		= require('gulp-sourcemaps');
var uglify 			= require('gulp-uglify');
var browserSync 	= require('browser-sync').create();

// Gulp BrowserSync Task
// Static Server + watching scss/html files
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
  	gulp.watch('./_/components/sass/**/*.{scss,sass}', ['sass']);
  	gulp.watch('./_/components/js/*.js', ['uglify']);
  	gulp.watch('*.html').on('change', browserSync.reload);


});// gulp browsersync task

// Gulp js Task
gulp.task('uglify', function() {

	// find the js files and return
	return gulp.src('./_/components/js/**/*.js')

	// compress the js files
	.pipe(uglify())

	.on('error', onError)
	
	// output js into js dir
	.pipe(gulp.dest('./_/js'))
	
	// add to browsersync stream & live reload using BrowserSync
	.pipe( browserSync.stream() );

}); // uglify

// Gulp Sass Task 
gulp.task('sass', function() {

	// find the sass files and extentions. return make browserSync wait for sass to be processed
	return gulp.src('./_/components/sass/**/*.{scss,sass}')

	// initialise sourcemaps
	.pipe(sourcemaps.init())
	
	// compile sass into css. Also add errors to console
	.pipe(sass({
		errLogToConsole: true
	}))

	.on('error', onError)

	// compile sass the source map 
	.pipe(sourcemaps.write())

	// output css into the css dir
	.pipe(gulp.dest('./_/css'))

	// add to browsersync stream & live reload using BrowserSync
	.pipe( browserSync.stream() );

});//gulp sass

function onError(err) {
  console.log(err);
  this.emit('end');
}

// Create Gulp Default Task
gulp.task('default', ['serve']);


var gulp = require('gulp');
var eslint = require('gulp-eslint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');

var onError = function (err) {
	gutil.beep();
	console.log(err);
};

// TASK: Minify Javascript
gulp.task('build', ['lint'], function () {
    return gulp.src(['src/*.js'])
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(rename(function (path) {
            path.basename += '.min';
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

// TASK: Lint
gulp.task('lint', function () {
    return gulp.src(['src/*.js'])
        // eslint() attaches the lint output to the eslint property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        .pipe(eslint.failOnError());
});

gulp.task('watch', function () {
	var jsWatcher = gulp.watch(['src/*.js'], ['build']);
	jsWatcher.on('change', function (event) {
		console.log('File ' + event.path + ' was ' + event.type + ', running task...');
	});
});

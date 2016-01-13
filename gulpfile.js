/*GULP Job file 
***************************************
 * Automate processing for :
 *- Converting SASS to CSS
 *- Minifiying */
//=====================================

// Standanrd Dependance
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	minifycss = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');
	watch = require('gulp-watch'),

// Testing Task 
gulp.task('test', function(){
	console.log('This is printed in the console !');
});

// Definning CSS Taskes
gulp.task('style', function(){
	return gulp.src('public/sass/style.scss')
	.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
	.pipe(gulp.dest('public/css/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(gulp.dest('public/css/'))
});

// Definning JS Taskes

// watch All changes on CSS
gulp.task('watch', function(){
	gulp.watch('public/sass/*.scss', ['style']);
})
var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync');

gulp.task('sass', function () {
    return gulp.src('app/sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'));
})
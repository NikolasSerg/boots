var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs');

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('scriptJS', function () {
    return gulp.src("node_modules/jquery")
        .pipe(concat('alljs.js'))
        .pipe(uglify())
        .pipe(gulp.dest("dist/JS"))
});

gulp.task('browser-sync', function () {
   browserSync.init({
       server: 'app'
   });
    gulp.watch('app/sass/*.scss',[sass]);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'browser-sync']);

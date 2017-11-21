var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    rigger          = require('gulp-rigger'),
    sourcemaps       = require('gulp-sourcemaps'),
    clean           =require('gulp-clean'),
    rename          =require('gulp-rename'),
    cssnano         =require('gulp-cssnano');

gulp.task('sass', function () {             /*ПРАЦЮЄ*/
    return gulp.src('app/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(rename({
            suffix:"-min"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('app/css'))
});

gulp.task('script', function (){            /*ПРАЦЮЄ*/
    return gulp.src("app/js/customs/main.js")
        //.pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(uglify())
        .pipe(rename({
             basename: "js",
             suffix: "-min"
         }))
        //.pipe(sourcemaps.write("."))
        .pipe(gulp.dest("app/js"));
});

gulp.task('browser-sync', function () {
   browserSync.init({
       server: 'app'
   });
    gulp.watch(['app/sass/*.scss', 'app/*.html'],[sass]).on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'browser-sync']);



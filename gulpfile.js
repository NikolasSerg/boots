var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    rigger          = require('gulp-rigger'),
    sourcemaps       = require('gulp-sourcemaps'),
    clean           =require('gulp-clean'),
    rename          =require('gulp-rename'),
    cssnano         =require('gulp-cssnano'),
    autoprefixer    =require('gulp-autoprefixer');

gulp.task('server', function () {
    browserSync.init({
        server: 'app'
    });
});

gulp.task('sass', function () {             /*ПРАЦЮЄ*/
    return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix:"-min"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
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
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

gulp.task('servers', function () {
    browserSync.init({
        server: 'app'
    });
});

gulp.task('watcher', ['sass', 'script', 'servers'], function () {
    gulp.watch("app/**/*.html", browserSync.reload);
    gulp.watch("app/sass/**/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js", ['script']);

});

//gulp.task('default', ['sass', 'scripts', 'servers']);


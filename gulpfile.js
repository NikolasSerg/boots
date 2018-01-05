var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    rigger          = require('gulp-rigger'),
    sourcemaps      = require('gulp-sourcemaps'),
    clean           = require('gulp-clean'),
    rename          = require('gulp-rename'),
    cssnano         = require('gulp-cssnano'),
    autoprefixer    = require('gulp-autoprefixer'),
    del             = require('del'),
    pug             = require('gulp-pug'),
    //htmlb           = require('gulp-html-beautify')
    notify          = require('gulp-notify');

gulp.task('servers', function () {
    browserSync.init({
        server: 'app'
    });
});

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions']
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error running something"
        }))
        .pipe(cssnano())
        .pipe(rename({
            suffix:"-min"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
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


gulp.task('watcher', ['sass', 'script', 'servers'], function () {
    gulp.watch("app/*.html", browserSync.reload);
    gulp.watch("app/sass/**/*.scss", ['sass']);
    gulp.watch("app/js/**/*.js", ['script']);

});

gulp.task('clean folders', function () {
    return del.sync(['app/css/'])
});

gulp.task ('proba', ['clean folders', 'sass']);


gulp.task('pug', function() {
    return gulp.src('app/pug/**/*.pug')
        .pipe(pug())
        .pipe(htmlb(
             {indentSize: 2,
                 formatted: ['a', 'img']
             }
         ))
        .pipe(gulp.dest('dist/html'))
});

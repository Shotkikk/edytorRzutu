// Libraries
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var stripComments = require('gulp-strip-comments');
var stripCssComments = require('gulp-strip-css-comments');
var browserSync = require('browser-sync').create();

// Minify pipe: app/*.html -> dist/*.min.html
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(stripComments())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify pipe: app/scss/**/*.scss + node_modules -> app/css/style.min.css
gulp.task('css', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'app/scss/**/*.scss'
    ])
        .pipe(sass())
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer())
        .pipe(stripCssComments())
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify pipe: node_modules -> app/js/scripts.min.css
gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/interactjs/dist/interact.min.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Minify pipe: app/js/**/*.js -> app/js/*.js
gulp.task('js-app', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(stripComments())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Copy pipe: app/fonts/**/*.{ttf,otf} -> app/fonts/**/*.{ttf,otf}
gulp.task('fonts', function () {
    return gulp.src('app/fonts/**/*.{ttf,otf}')
        .pipe(gulp.dest('dist/fonts'))
});

// Make server on :3000 or reload the server
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist',
            index: 'planeEditor.min.html'
        }
    })
});

// Watch changes on app/**/*.*
gulp.task('watch', ['browserSync'], function () {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/scss/**/*.scss', ['css']);
    gulp.watch('app/fonts/**/*.{ttf,otf,woff}', ['fonts']);
    gulp.watch('app/js/**/*.js', ['js']);
});

// Building app/**/*.* to dist/**/*.* (Commands combo)
gulp.task('build', ['html', 'css', 'fonts', 'js', 'js-app']);
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),  // init BrowserSync
    concat = require('gulp-concat'),   // init js conactination
    uglify = require('gulp-uglifyjs'), // init compressor
    cssnano = require('gulp-cssnano'),  // minify css
    rename = require('gulp-rename'),   // rename file
    del = require('del'), // clear function
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function () {
    return gulp.src([
        'app/sass/**/*.sass',
        'app/sass/**/*.scss'
    ])
        .pipe(sass())  // call sass function
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(gulp.dest('app/css'))  // our destination folder
        .pipe(cssnano()) // compressing
        .pipe(rename({suffix: '.min'})) // rename
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({  // inject change of our css style to browser page
            stream: true
        }))
});

gulp.task('css-libs', ['sass'], function () {
    return gulp.src([
        'app/css/libs.css',
        'app/css/main.css'
    ])
        .pipe(cssnano()) // compressing
        .pipe(rename({suffix: '.min'})) // rename
        .pipe(gulp.dest('app/css'))
});

gulp.task('scripts-libs', function () {
    return gulp.src([
        'app/libs/jquery/jquery-3.2.1.min.js',
        'app/libs/magnific-popup/jquery.magnific-popup.min.js',
        'app/libs/mixitup/mixitup.min.js',
        'app/libs/animate/animate-css.js',
        'app/libs/jquery.maskedinput/jquery.maskedinput.min.js',
        'app/libs/jquery-lazyload/jquery.lazy.min.js',
        'app/libs/jquery-lazyload/jquery.lazy.plugins.min.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('scripts', function () {
    return gulp.src([
        'app/js/scripts.js'
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('scripts-gallery', function () {
    return gulp.src([
        'app/js/scripts-gallery.js'
    ])
        .pipe(concat('scripts-gallery.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('html5', function () {
    return gulp.src([
        'app/libs/html5shiv/es5-shim.min.js',
        'app/libs/html5shiv/html5shiv.min.js',
        'app/libs/html5shiv/html5shiv-printshiv.min.js',
        'app/libs/respond/respond.min.js'
    ])
        .pipe(concat('html5.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
});

// we named this task
gulp.task('browser-sync', function () { //task for BrowserSync
    browserSync({ // this is our variable
        server: {  // this is option
            baseDir: 'app'
        },
        notify: false // this is off notification
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

//working before watch task
gulp.task('watch', ['css-libs', 'browser-sync', 'scripts-libs', 'scripts', 'scripts-gallery', 'html5'], function () {
    gulp.watch('app/sass/**/*.scss', ['sass']);   // change CSS
    gulp.watch('app/*.html', browserSync.reload); // change HTML
    gulp.watch('app/js/**/*.js', browserSync.reload); // change JS
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts-libs', 'scripts', 'scripts-gallery', 'html5'], function () {
    gulp.src([
        'app/css/main.min.css',
        'app/css/libs.min.css'
    ])
        .pipe(gulp.dest('dist/css'));

    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    gulp.src([
        'app/js/html5.min.js',
        'app/js/libs.min.js',
        'app/js/scripts.min.js',
        'app/js/scripts-gallery.min.js'
        ])
        .pipe(gulp.dest('dist/js'));

    gulp.src('app/*.*')
        .pipe(gulp.dest('dist'));
});

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify-es').default;
const tap = require('gulp-tap');

require('dotenv').load();

const production = process.env.NODE_ENV === 'production';

gulp.task('default', [ 'move', 'js', 'css', 'views', 'lib' ]);

gulp.task('move', () => {
    return gulp.src(['./client/**/*.*', '!./client/js/**', '!./client/sass/*.scss'], { base: './' })
            .pipe(gulp.dest('dist'));
});
gulp.task('js', () => {
    return gulp.src(['./client/js/*.js', './client/js/components/*.js'], { base: './' })
            .pipe(production ? uglify(/* options */): tap(()=>  true))
            .pipe(gulp.dest('dist'));
});
gulp.task('css', () => {
    return gulp.src(['client/sass/*.scss'])
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('dist/client/css'));
});
gulp.task('views', () => {
    return gulp.src(['./server/views/*.*', './server/views/**/*.*'], { base: './' })
            .pipe(gulp.dest('dist/'));
});
gulp.task('lib', () => {
    gulp.src(['client/libdev/bootstrap/dist/css/bootstrap.min.css'
                , 'client/libdev/fontawesome/web-fonts-with-css/css/fontawesome-all.min.css'])
        .pipe(gulp.dest('dist/client/lib/css'));
    gulp.src(['client/libdev/fontawesome/web-fonts-with-css/webfonts/**'])
        .pipe(gulp.dest('dist/client/lib/webfonts'));
    return gulp.src(['node_modules/react/umd/react.production.min.js'
                    , 'node_modules/react-dom/umd/react-dom.production.min.js'
                    , 'client/libdev/bootstrap/dist/bootstrap.min.js'
                    , 'client/libdev/jquery/dist/jquery.min.js'
                    , 'client/libdev/moment/min/moment.min.js'
                    , 'client/libdev/underscore/underscore-min.jss'])
            .pipe(gulp.dest('dist/client/lib/js'));
});
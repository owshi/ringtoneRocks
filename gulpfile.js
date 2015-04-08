var gulp = require("gulp"),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    less = require('gulp-less'),
    watch = require("gulp-watch"),
    clean = require('del'),
    csso = require('gulp-csso')
sprite = require('gulp.spritesmith'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify');
var plumber = require('gulp-plumber');

gulp.task("clean", function() {
    clean(["web/style.css", "web/assets/js/"]);
});

gulp.task("script", function() {
    gulp.src("dev/js/**/*.js")
        .pipe(plumber())
        .pipe(jshint())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('web/assets/js/'))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(uglify())
        .pipe(gulp.dest('web/assets/js'));

});

gulp.task("css", function() {
    gulp.src('dev/less/style.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest("dev/css/"))

    .pipe(gulp.dest("web/"));
});
gulp.task('sprite', function() {
    // Generate our spritesheet
    var spriteData = gulp.src('dev/sprites/*.png').pipe(sprite({
        imgName: 'sprite-brands.png',
        cssName: '_sprites.less',
        imgPath: 'assets/img/sprite-brands.png',
        algorithm: 'top-down',
        padding: 1,
        cssFormat: 'css',
        cssOpts: {
            cssClass: function(item) {
                return '.sprite-' + item.name;
            }
        }
    }));

    // Pipe image stream through image optimizer and onto disk
    spriteData.img
        .pipe(gulp.dest('web/assets/img/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    spriteData.css
        .pipe(gulp.dest('dev/less/'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('css', 'script');
});

gulp.task('watch', function() {
    gulp.watch("dev/less/**/*.less", ['css']);
    gulp.watch('dev/js/**/*.js', ['script']);
});

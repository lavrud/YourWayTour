var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
// task sass renderiza:css/comprimir
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss').pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError)).pipe(gulp.dest('css'));
});
// task minify comprimir/js
gulp.task('minify-js', function () {
    gulp.src('js/**/*.js').pipe(uglify()).pipe(gulp.dest('js'));
});
// task watch assistir tarefas gulp
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});
// task padrão gulp
gulp.task('default', ['sass', 'watch', 'minify-js']);

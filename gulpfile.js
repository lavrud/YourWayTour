var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
// task sass renderiza:css/comprimir
gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss').pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError)).pipe(gulp.dest('css'));
});
// task watch assistir tarefas gulp
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
});
// task padrão gulp
gulp.task('default', ['sass', 'watch']);

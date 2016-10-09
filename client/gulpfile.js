var gulp = require('gulp'),
  watch = require('gulp-watch');

gulp.task('stream', function() {
  // Endless stream mode
  return watch(['app/**/*.css', 'app/**/*.html'], {
      ignoreInitial: false
    })
    .pipe(gulp.dest('build'));
});

gulp.task('default', ['stream']);

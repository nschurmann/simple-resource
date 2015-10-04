var gulp = require('gulp'),
    Server = require('karma').Server;

gulp.task('default', function () {

});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.config.js',
    singleRun: true
  }, done).start();
});

gulp.task('autotest', ['test'], function () {
  gulp.watch('spec/*', ['test']);
  gulp.watch('src/*', ['test']);
});
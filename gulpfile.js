var gulp = require('gulp')
  , path = require('path')
  , plugins = require('gulp-load-plugins')()
  , browserSync = require('browser-sync')

  , siteConfig = require('./package.json')
  , THEME_PATH = siteConfig.themePath
  , THEME_LIBRARY_PATH = THEME_PATH + 'library/'
  , LESS_PATH = THEME_LIBRARY_PATH + 'less/'
  , SCRIPT_PATH = THEME_LIBRARY_PATH + 'js/'
  , BUILD_PATH = THEME_LIBRARY_PATH + 'build/'
  ;

// Error Handler
function onError(err) {
  plugins.util.log(err.message);
  this.emit('end');
}

// Less And CSS tasks
gulp.task('less', function() {
  return gulp.src([LESS_PATH + 'style.less', LESS_PATH + 'style-base.less'])
    .pipe(plugins.less({
      generateSourceMap: true, // default true
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .on('error', onError)
    .pipe(gulp.dest(BUILD_PATH))
    ;
});

gulp.task('minify-css', ['less'], function() {
  return gulp.src([BUILD_PATH + 'style.css', BUILD_PATH + 'style-base.css'])
    .pipe(plugins.minifyCss())
    .on('error', onError)
    .pipe(gulp.dest(BUILD_PATH))
    ;
});

// JS tasks
gulp.task('jshint', function() {
  return gulp.src(SCRIPT_PATH + '*.js')
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.jshint.reporter('fail'));
});

gulp.task('e6to5', function() {
  return gulp.src(SCRIPT_PATH + 'main.js')
    .pipe(plugins['6to5']())
    .on('error', onError)
    .pipe(gulp.dest(SCRIPT_PATH + 'es5/'))
    ;
});

gulp.task('uglify', ['e6to5'], function() {
  gulp.src(SCRIPT_PATH + 'map.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest(BUILD_PATH))
    ;
  return gulp.src(SCRIPT_PATH + 'es5/main.js')
    .pipe(plugins.uglify())
    .pipe(gulp.dest(BUILD_PATH))
    ;
});

// Watch tasks
gulp.task('watch', function() {
  gulp.watch(SCRIPT_PATH + '*.js', ['jshint', 'uglify', browserSync.reload]);
  gulp.watch(LESS_PATH + '**/*.less', ['less', browserSync.reload]);
  gulp.watch(THEME_PATH + '*.php', browserSync.reload);
});

gulp.task('browser-sync', function() {
   browserSync({
      proxy: 'http://mywebsite.com'
   });
});

gulp.task(
  'default',
  [
    'less'
    , 'jshint'
    , 'watch'
  ]
);

// run this task with a commit message gulp deploy --commit="commit message"
gulp.task(
  'deploy',
  [
    'minify-css'
    , 'jshint'
    , 'uglify'
  ],
  function() {
    gulp.start('rsync');
  }
);


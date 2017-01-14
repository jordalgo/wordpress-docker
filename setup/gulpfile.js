const gulp = require('gulp');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');

const siteConfig = require('./package.json');
const THEME_PATH = siteConfig.themePath;
const THEME_LIBRARY_PATH = THEME_PATH + 'library/';
const LESS_PATH = THEME_LIBRARY_PATH + 'less/';
const SCRIPT_PATH = THEME_LIBRARY_PATH + 'js/';
const JS_MODULES_GLOB = SCRIPT_PATH + 'modules/**/*.js';
const BUILD_PATH = THEME_LIBRARY_PATH + 'build/';

let watching = false;
let dev = false;

// Error Handler so watch doesn't kill the process on error.
function onError(err) {
  plugins.util.log(err.message);
  if (watching) {
    this.emit('end');
  } else {
    throw err;
  }
}

function conditionalRun(fn) {
  if (!dev) {
    return fn();
  }
  return () => {};
}

// Javascript Linting
gulp.task('lint', () => gulp.src([JS_MODULES_GLOB])
  .pipe(eslint())
  .on('error', onError)
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
);

// Less to CSS
gulp.task('less', () => gulp.src([LESS_PATH + 'style.less', LESS_PATH + 'style-base.less'])
  .pipe(less({
    generateSourceMap: true,
    paths: [ path.join(__dirname, 'less', 'includes') ]
  }))
  .on('error', onError)
  .pipe(gulp.dest(BUILD_PATH))
);

gulp.task('minify-css', ['less'], () => gulp.src([
    `${BUILD_PATH}style.css`,
    `${BUILD_PATH}style-base.css`
  ])
  .pipe(cleanCSS())
  .pipe(gulp.dest(BUILD_PATH))
);

// Javascript Bundling
gulp.task('bundle', () => browserify({
    entries: [`${SCRIPT_PATH}modules/main.js`]
  })
  .transform(babelify.configure({
    presets : ['es2015']
  }))
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest(BUILD_PATH))
);

gulp.task('uglify', ['bundle'], cb => {
  pump(
    [
      gulp.src(`${BUILD_PATH}main.js`),
      uglify(),
      gulp.dest(BUILD_PATH)
    ],
    cb
  );
});

gulp.task('watch', function() {
  watching = true;
  gulp.watch(JS_MODULES_GLOB, ['lint', 'bundle']);
  gulp.watch(LESS_PATH + '**/*.less', ['less']);
});

gulp.task('dev', function() {
  dev = true;
});

gulp.task('default', [
    'dev',
    'less',
    'lint',
    'bundle',
    'watch'
  ]
);

gulp.task('build', ['minify-css', 'lint', 'uglify']);


var gulp = require('gulp');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var gulpif = require('gulp-if');
var args = require('yargs').argv;
var gulpprint = require('gulp-print');

gulp.task('hello-world',function(){
  console.log('Hello World from gulp');
});//end:

var jsSource = ['./src/**/*.js','./*.js']; //Source and any subfolders and any JS files

gulp.task('vet',function(){
  log('Analyzing source with JSHint and JSCS');
  return gulp
  .src(jsSource)
  .pipe(gulpif(args.verbose,gulpprint()))
  .pipe(jscs())
  .pipe(jshint())
  //Jshint has an inbuilt method called reporter which takes jshint-stylish
  .pipe(jshint.reporter('jshint-stylish',{verbose:true}))
  .pipe(jshint.reporter('fail'));
});//end

//////////////Extraneous functions
function log(msg){
  if(typeof(msg) === 'object'){
    for(var item in msg){
      if(msg.hasOwnProperty(item)){
        util.log(util.colors.green(msg[item]));
      }
    }//end:foreach
  }else{
    util.log(util.colors.green(msg));
  }
}//end:log

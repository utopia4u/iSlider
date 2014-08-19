﻿var gulp = require('gulp');  
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var browserify = require('browserify');
var beautify = require('gulp-beautify');
var source = require('vinyl-source-stream');
var connect = require('gulp-connect');

//lint task  
gulp.task('less', function () {
  gulp.src('./less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/'));
});

gulp.task('jshint',function(){
    gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify', function() {
  gulp.src('./js/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('./public/'))
});

gulp.task('browserify',function(){
    browserify('./js/app.js',{debug:false,insertGlobals: false})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
});
//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    port:3000
  });
});
//默认任务   
gulp.task('default',['less','jshint','beautify','browserify','connect'],function(){
     gulp.watch(['gulpfile.js','./js/*.js','./less/*.less'],['less','jshint','browserify']);
});
'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    watch: {
      main: {
        options: {
          livereload: true,
          livereloadOnError: false,
          spawn: false
        },
        files: ['angular-resizr.js','angular-resizr.css','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'angular-resizr.js'
      }
    },
    jasmine: {
      unit: {
        src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-resizr.js','./demo/demo.js'],
        options: {
          specs: 'test/*.js'
        }
      }
    },
    concat: {
      main: {
        src: ['angular-resizr.js'],
        dest: 'dist/angular-resizr.js'
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-resizr.css',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-resizr.js',dest:'dist/angular-resizr.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-resizr.min.css': 'dist/angular-resizr.css'
        }
      }
    }
  });

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};
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
        files: ['angular-yearselector.html','angular-yearselector.js','angular-yearselector.css','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'angular-yearselector.js'
      }
    },
    jasmine: {
      unit: {
        src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-yearselector.js','./demo/demo.js'],
        options: {
          specs: 'test/*.js'
        }
      }
    },
    ngtemplates: {
      main: {
        options: {
          module:'yearSelector',
          base:''
        },
        src:'angular-yearselector.html',
        dest: 'temp/templates.js'
      }
    },
    concat: {
      main: {
        src: ['angular-yearselector.js', 'temp/templates.js'],
        dest: 'dist/angular-yearselector.js'
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-yearselector.css',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-yearselector.js',dest:'dist/angular-yearselector.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-yearselector.min.css': 'dist/angular-yearselector.css'
        }
      }
    }
  });

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['ngtemplates','concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};
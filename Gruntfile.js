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
        files: ['angular-hierarchical-typeahead.js','angular-hierarchical-typeahead.css','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    jshint: {
      main: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'angular-hierarchical-typeahead.js'
      }
    },
    jasmine: {
      unit: {
        src: ['./bower_components/jquery/dist/jquery.js','./bower_components/angular/angular.js','./bower_components/angular-animate/angular-animate.js','./bower_components/angular-mocks/angular-mocks.js','./dist/angular-hierarchical-typeahead.js','./demo/demo.js'],
        options: {
          specs: 'test/*.js'
        }
      }
    },
    concat: {
      main: {
        src: ['angular-hierarchical-typeahead.js'],
        dest: 'dist/angular-hierarchical-typeahead.js'
      }
    },
    copy: {
      main: {
        files: [
          {src:'angular-hierarchical-typeahead.css',dest:'dist/'}
        ]
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-hierarchical-typeahead.js',dest:'dist/angular-hierarchical-typeahead.min.js'}
        ]
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-hierarchical-typeahead.min.css': 'dist/angular-hierarchical-typeahead.css'
        }
      }
    }
  });

  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['concat','uglify','copy','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};
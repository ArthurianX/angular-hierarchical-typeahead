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
        files: ['angular-hierarchical-typeahead.html','angular-hierarchical-typeahead.js','angular-hierarchical-typeahead.scss','dist/**/*','demo/**/*'],
        tasks: ['jshint','build']
      }
    },
    ngtemplates: {
      main: {
        options: {
          module:'artTypeahead',
          base:''
        },
        src:'angular-hierarchical-typeahead.html',
        dest: 'temp/templates.js'
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
        src: ['angular-hierarchical-typeahead.js', 'temp/templates.js'],
        dest: 'dist/angular-hierarchical-typeahead.js'
      }
    },
    uglify: {
      main: {
        files: [
        {src:'dist/angular-hierarchical-typeahead.js',dest:'dist/angular-hierarchical-typeahead.min.js'}
        ]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'dist/angular-hierarchical-typeahead.css': 'angular-hierarchical-typeahead.scss'
        }
      }
    },
    cssmin: {
      main: {
        files: {
          'dist/angular-hierarchical-typeahead.min.css': 'dist/angular-hierarchical-typeahead.css'
        }
      }
    },
    notify_hooks: {
      options: {
        enabled: true,
        max_jshint_notifications: 5, // maximum number of notifications from jshint output
        success: true, // whether successful grunt executions should be notified automatically
        duration: 1 // the duration of notification in seconds, for `notify-send only
      }
    }
  });

  grunt.task.run('notify_hooks');
  grunt.registerTask('serve', ['jshint','connect', 'watch']);
  grunt.registerTask('build',['ngtemplates','concat','uglify','sass','cssmin']);
  grunt.registerTask('test',['build','jasmine']);

};
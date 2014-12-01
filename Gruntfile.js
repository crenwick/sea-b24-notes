'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mongo-drop');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-react');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jscs: {
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: ['models/**/*.js', 'server.js', 'routes/**/*.js']
    },

    simplemocha: {
      src: ['test/api/**/*.js']
    },

    mongo_drop: {
      test: {
        'uri': 'mongodb://localhost/notes_test',
      }
    },

    clean: {
      dev: {
        src: ['build/']
      },
      react: {
        src: ['app/js/react/build/']
      }
    },

    copy: {
      dev: {
        cwd: 'app/',
        src: ['**/*.html', 'css/**/*.css'],
        expand: true,
        dest: 'build/'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js',
        options: {
          transform: ['debowerify']
        }
      },
      test: {
        src: ['test/client/**/*.js'],
        dest: 'test/test_bundle.js',
        options: {
          transform: ['debowerify']
        }
      }
    },

    react: {
      files: {
        expand: true,
        cwd: 'app/js/react',
        src: ['**/*.jsx'],
        dest: 'app/js/react/build',
        ext: '.js'
      }
    },

    sass: {
      dist: {
        files: {
          'build/main.css': 'app/sass/main.sass'
        }
      }
    }
  });

  grunt.registerTask('lint', ['jshint', 'jscs']);
  grunt.registerTask('test', ['lint', 'mongo_drop', 'simplemocha']);
  grunt.registerTask('build:react', ['clean:react', 'react']);
  grunt.registerTask('build:dev', ['build:react', 'clean:dev', 'lint', 'browserify:dev', 'sass', 'copy:dev']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('default', ['test']);
};

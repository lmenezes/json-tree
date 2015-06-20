module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        src: ['dist/js']
      }
    },
    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['build'],
        options: {
          spawn: false
        }
      }
    },
    copy: {
      main: {
        files: [
          {
            src: ['css/jsontree.css'],
            dest: './dist/'
          }
        ]
      }
    },
    jscs: {
      src: ['src/jsontree.js'],
      options: {
        preset: 'google',
        requireCamelCaseOrUpperCaseIdentifiers: "ignoreProperties"
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      my_target: {
        files: {
          'dist/js/jsontree.min.js': ['src/jsontree.js']
        }
      }
    },
    qunit: {
      all: ['tests/jsontree.html']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.registerTask('dev', ['watch'])
  grunt.registerTask('build', ['clean', 'jscs', 'qunit', 'copy', 'uglify']);
};

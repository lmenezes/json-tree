module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      options: {
        configFile: 'conf/eslint.json',
        fix: true
      },
      target: [
        'jsontree.js'
      ]
    },
    qunit: {
      all: ['tests/jsontree.html']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('build', ['eslint', 'qunit']);
};

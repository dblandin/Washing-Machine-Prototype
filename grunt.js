module.exports = function(grunt) {
  grunt.initConfig({
  lint: {
    all: ['js/*.js']
  },
  concat: {
    js: {
      src: ['js/*.js', 'libs/*.js'],
      dest: 'dist/all.js'
    },
    css: {
      src: ['css/*.css'],
      dest: 'dist/all.css'
    }
  },
  min: {
    js: {
      src: ['dist/all.js'],
      dest: 'dist/all.min.js'
    }
  }
});
};
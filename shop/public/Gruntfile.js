module.exports = function(grunt) {

 // Grunt configuration.
 grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      dev:{

      },
      prod:{
          expand: true,
          cwd: 'components/',
          src: ['**/*.js'],
          dest: 'components/'
      },
    },
    cssmin: {
      prod: {
        files: [{
          expand: true,
          cwd: 'css/',
          src: ['*.css'],
          dest: 'css/',
          ext: '.css'
        }]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ["**/*.scss",
                "!**/_*.scss"
          ],
          dest: 'css',
          ext: '.css'
        }]
      }
  },    
    watch: {
      css: {
        cwd: 'scss',
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });

  // Load the grunt plugins used for uglify/sass compilation etc.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task(s).
  grunt.registerTask('default', ['sass', 'watch']);

  //Grunt Task for Dev environment
  grunt.registerTask('dev', ['sass']);

  // Grunt  Task for Production environment
  grunt.registerTask('prod', ['sass','uglify:prod', 'cssmin:prod']);
};

/*
* Step to install grunt
  1. npm install -g grunt
  2. npm init
  3. npm install grunt
  4. npm install grunt-contrib-uglify --save-dev
  5. npm install grunt-contrib-cssmin --save-dev
  6. npm install grunt-contrib-sass --save-dev
  7. npm install grunt-contrib-watch --save-dev
*/


/*
Command to run defualt task
$ grunt

Command to run Prod task
$ grunt prod
*/
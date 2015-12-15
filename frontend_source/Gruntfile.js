module.exports = function(grunt) {

   // 1. All configuration goes here 
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),

      concat: {
         dist: {
            src: [
              'js/modules/*.js',
              'js/app.js'
            ],
            dest: '../build/gog/app/js/app.js',
         }
      },

      uglify: {
         build: {
            src: '../build/gog/app/js/app.js',
            dest: '../build/gog/app/js/app.min.js'
         }
      },

      imagemin: {
         dynamic: {
            files: [
               {
                  expand: true,
                  flatten: true,
                  cwd: 'images/',
                  src: ['**/*.{png,jpg}'], 
                  dest: '../build/gog/app/images/'
               }
            ]
         }
      },

      sass: {
         dist: {
            options: {
               style: 'compressed'
            },
            files: {
               '../build/gog/app/css/app.css': 'sass/*.scss',
            }
         }
      },

      copy: {
         main: {
            files: [
               {expand: true, flatten: true, src: ['./*.html'], dest: '../build/gog/app/'},
               {expand: true, flatten: true, src: ['./sass/libs/*.css'], dest: '../build/gog/app/css/libs/'},
               {expand: true, flatten: true, src: ['./js/libs/*.js'], dest: '../build/gog/app/js/libs/'},
               {expand: true, flatten: true, src: ['./fonts/*'], dest: '../build/gog/app/fonts/'}
            ],
         }
      },

      watch: {
         // ADD IMAGEMIN FUNC
         options: {
            livereload: true
         },
         html: {
            files: ['*.html'],
            tasks: ['copy'],
            options: {
               spawn: false
            }
         },
         scripts: {
            files: ['js/*.js', 'js/**/*.js'],
            tasks: ['concat', 'uglify', 'copy'],
            options: {
               spawn: false,
            }
         },
         css: {
            files: ['sass/*.scss', 'sass/libs/*.scss'],
            tasks: ['sass'],
            options: {
               spawn: false
            }
         }
      }


   });

   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-imagemin');
   grunt.loadNpmTasks('grunt-contrib-sass');
   grunt.loadNpmTasks('grunt-contrib-watch');

   grunt.registerTask('default', ['copy', 'concat', 'uglify', 'sass', 'imagemin']);

};
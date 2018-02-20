module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'dist',
                        ext: '.min.js'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{expand: true, cwd: 'src/sass', src: '**/*.scss', dest: 'dist/assets/css', ext: '.min.css'}]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'node_modules/angular/angular.min.js',
                            'node_modules/angular-animate/angular-animate.min.js',
                            'node_modules/angular-aria/angular-aria.min.js',
                            'node_modules/angular-route/angular-route.min.js',
                            'node_modules/angular-material/angular-material.min.js'
                        ],
                        dest: 'dist/assets/js/',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: 'node_modules/angular-material/angular-material.scss',
                        dest: 'src/sass/md/',
                        rename: function(dest, src) {
                            // use the source directory to create the file
                            // example with your directory structure
                            //   dest = 'dev/js/'
                            //   src = 'module1/js/main.js'
                            return 'src/sass/md/_md.scss';
                            //dest + src.substring(0, src.indexOf('/')) + '.js';
                        }
                    }
                ],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('actualizar', ['copy', 'sass', 'uglify']);
};

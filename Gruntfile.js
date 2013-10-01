module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            "public/js/browser.js" : [
                "/features/app.startup.js"
            ]
        },
        hogan: {
            publish: {
                options: {
                    prettify: false,
                    commonJsWrapper: true,
                    defaultName: function (file) {
                        var k = file.replace('./features/', '');
                        var l = k.replace('/views/', '/');
                        var h = l.replace('.min.html', '');
                        return h.toLowerCase();
                    }
                },
                files: {
                    './build/templates.js': ['./features/**/*.min.html']
                }
            }
        },
        concat: {
            options: {
                separator: '; '
            },
            templates: {
                src: ['./build/hoganheader.js', './build/templates.js'],
                dest: './features/templates.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-hogan');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cafe-mocha');

    grunt.registerTask('default', ['hogan', 'concat', 'browserify']);
};
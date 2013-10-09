module.exports = function (grunt){

    var _ = require("underscore");
    var fs = require("fs");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            "public/js/browser.js" : [
                "/features/app.startup.js"
            ]
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: (function () {
                    var walk = function (path) {
                        var result = [];

                        var stats = fs.statSync(path);
                        if (stats.isFile()) {
                            var match = (path.match(/(\.min)|(\.html)$/gi) || []);
                            if (match.length === 1) {
                                result.push(path);
                            }
                        } else if (stats.isDirectory()) {
                            var list = fs.readdirSync(path);
                            list.forEach(function (dir) {
                                result = _.union(result, walk(path + '/' + dir));
                            });
                        }

                        return result;
                    };

                    return _.reduce(walk('./features'), function (memo, file) {
                        memo[file.replace('.html', '.min.html')] = file;
                        return memo;
                    }, {});
                })()
            }
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

    grunt.registerTask('default', ['htmlmin', 'hogan', 'concat', 'browserify']);
};
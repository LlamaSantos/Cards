module.exports = function (grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            "/public/browser.js" : [
                "/features/app.startup.js"
            ]
        },
        hogan : {
            publish : {
                options : {
                    prettify : true,
                    commonJsWrapper : true,
                    defaultName : function (file){
                        return file.toLowerCase();
                    }
                },
                files : {
                    "./features/templates.js" : ["./features/**/*.html"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-hogan");

    grunt.registerTask("default", ["hogan", "browserify"]);
    grunt.registerTask("test", ["hogan", "browserify"]);
};
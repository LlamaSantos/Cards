(function (module){
    "use strict";

    module.exports = function (app, templates){
        app.get('/', function (req, res){

            var html = templates["main/main"].render();
            res.send(200, html);

        });
    };

})(module);

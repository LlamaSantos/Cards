var express = require("express")
    , app = express()
    , templates = require("./features/templates.js");

app.use(express.static(__dirname + "/public"));
app.engine("html", function (path, options, cb){
        cb(null, "hello world");
    });
app.set("view engine", "html");
app.set("views");
app.enable("view cache");

// -- Features
require("./features/main/routes.js")(app, templates);

// -- Start this beotch
var port = process.env.PORT || 8081
app.listen(port, function (data){
    console.info("Application started on http://localhost:%s", port);
});

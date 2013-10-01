var express = require("express")
    , app = express();

app.use(express.static(__dirname + "/public"));
app.engine("html", function (path, options, cb){
        cb(null, "hello world");
    });
app.set("view engine", "html");
app.set("views");
app.enable("view cache");

// -- Features
require("./features/home/routes.js").init(app);


// -- Start this beotch
app.listen(process.env.PORT, function (data){
    console.info(data);
});
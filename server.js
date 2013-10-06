var express = require("express")
    , app = express();

app.use(express.static(__dirname + "/public"));
app.engine("html", function (path, options, cb){
        cb(null, "hello world");
    });
app.set("view engine", "html");
app.set("views");
app.enable("view cache");

<<<<<<< HEAD
if (true)
	console.log ("taco amigo");

=======
// -- Features
require("./features/home/routes.js").init(app);
>>>>>>> 317c82024ae48555966eb94e8adeb2527adb8116


// -- Start this beotch
app.listen(process.env.PORT, function (data){
    console.info(data);
});
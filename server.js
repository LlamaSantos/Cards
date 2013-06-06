var express = require("express")
    , app = express();

app.use(express.static(__dirname + "/public"));
app.use("html", require("hogan-express"));
app.enable("view cache");

if (true)
	console.log ("hogan");
else
	console.log("something screwed up.");

app.get("/", function (req, res){
    res.render("index", {partials : {}}); // nothing defined atm
});

app.listen(8080, function (err){
    console.info("Started up on http://localhost:8080/");
});
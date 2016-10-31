var express = require("express");
var app = express();
var request = require("request");

// Serve public dir
app.use(express.static("public"));
// Set view engine ejs so that wont need to type .ejs extension
app.set("view engine", "ejs");

// Landing page
app.get("/", function(req, res){
    res.render("home");
});

// Display search results
app.get("/search", function(req, res){
    var title = req.query.title;
    var url = "https://api.themoviedb.org/3/search/tv?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US&query=" +title;

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var series = JSON.parse(body);
            res.render("results", {series:series});
        }
    });
});

// Display show details
app.get("/serie/:serien_id", function(req, res){
    var id = req.params.serien_id;
    var url = "https://api.themoviedb.org/3/tv/" + id + "?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var serie = JSON.parse(body);
            res.render("serie", {serie:serie});
        }
    });
});


// Start listening to server
app.listen(3000, function(){
    console.log("The server has started on port 3000");
})

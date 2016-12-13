var express = require("express");
var bodyParser = require('body-parser');
var request = require("request");
var router = require('./route/allRoutes');
var mongoose = require('mongoose');
var sessions = require('client-sessions');

var app = express();

//used for user auth.
app.use(sessions({
    cookieName: 'session',
    secret: '1234567890',
    duration: 30 * 60* 1000,
    activeDuration: 5 * 60 * 1000,
}));

//use to get get/post request as an object
app.use(bodyParser());

// Database
var databasename = "profiles"

// if errors occur while connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to database "+ databasename); // we're connected!
});

//connect to database (mongod should be already running)
mongoose.connect('mongodb://localhost/'+databasename);

// Serve public dir
app.use(express.static("public"));

// Set view engine ejs so that wont need to type .ejs extension
app.set("view engine", "ejs");

//routing
router(app);

app.get('/test', function (req, res) {
    console.log(req.session.user);
    res.render("example");
});
// Start listening to server
app.listen(3000, function(){
    console.log("The server has started on port 3000");
})

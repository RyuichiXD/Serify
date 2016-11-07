var express = require("express");
var router = express.Router();

var users = require('../controller/userController');

router.get("/", function(req, res){
    res.render("login");
});

// check if username and password is right
router.post('/check', users.check);

// add user to db
router.post('/register', users.post);

module.exports = router;
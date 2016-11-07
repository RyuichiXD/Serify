/**
 * Created by Samy on 06.11.2016.
 */
require('../models/user');

var mongoose = require('mongoose');
var User = mongoose.model("User");



//Add User in db
//if post is used in form, this function is going to execute
exports.post = function (req,res) {
    console.log("geadded")
    var user = new User(req.body);
    user.save();
    res.jsonp(user);
}

//Check if user exist
exports.check = function (req,res) {
    console.log("check user-login")
    User.find({ username: 'Ryuichi001', password: '121212'},function (err,user) {
        if (err) throw err;

        //if found
        console.log(user + " success");
    })
}
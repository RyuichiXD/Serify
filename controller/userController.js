/**
 * Created by Samy on 06.11.2016.
 */
var schema = require('../models/user');

var mongoose = require('mongoose');
var User = schema.user;

exports.getLogin = function (req,res) {
    res.render("login");
}

//Add User in db
//if post is used in form, this function is going to execute
//TODO: add res.render to something(?)
exports.post = function (req,res) {
    User.find({$or:[ {email: req.body.email}, {username: req.body.username}]},function (err,user) {
        if (err)
        {
            console.log("Fehler beim finden des users "+ err);
        }
        //check if email or username in database
        if(!user.length)
        {
            var user = new User(req.body);
            user.save();
            res.jsonp(user);
            console.log(req.body.username+" geadded");

        }
        else
        {
            console.log("Profil exisistert bereits");
            console.log(req.body);
        }
    })

}

//Check if user exist
//TODO: Do something when logged in (res.render Dashbord)
exports.check = function (req,res) {
    console.log("check user-login")
    User.find({ email: req.body.email, password: req.body.password},function (err,user) {
        if (err)
        {
            console.log("Fehler beim finden des users "+ err);
        }

        if(!user.length)
        {
            console.log("Profil nicht gefunden");
        }
        else
        {
            console.log("Profil gefunden");
        }
    })
}
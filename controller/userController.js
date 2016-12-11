/**
 * Created by Samy on 06.11.2016.
 */
var schema = require('../models/user');

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
            var newUser = new User(req.body);
            newUser.save(function(err) {
                if (err)
                    console.log(err);
                else
                    console.log(req.body.username+" created!");
            });
            res.sendStatus(200)
        }
        else
        {
            console.log("Profil exisistert bereits");
            console.log(req.body);
            res.sendStatus(200)
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
            res.sendStatus(404)
        }
        else
        {
            console.log("Profil gefunden");
            res.sendStatus(200)
        }

    })
}
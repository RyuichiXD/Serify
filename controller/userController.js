/**
 * Created by Samy on 06.11.2016.
 */
var schema = require('../models/user');

var User = schema.user;

exports.getLogout = function (req,res) {

    req.session.reset();
    res.redirect("/");

}

//Add User in db
//if post is used in form, this function is going to execute
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
            res.sendStatus(200);
            res.redirect("/");
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
exports.check = function (req,res) {
    let options = {
        maxAge: 1000 * 60 * 15 // would expire after 15 minutes
    }
    console.log("check user-login")
    User.findOne({ email: req.body.email, password: req.body.password},function (err,user) {
        if (err)
        {
            console.log("Fehler beim finden des users "+ err);
        }
        if(user)
        {
            console.log("Profil gefunden" + typeof Number(user._id));
            // res.cookie("serifyCookie", String(user._id));
            req.session.user = user;
            res.redirect("/");
            console.log("Session: " + req.session.user);

        }

    })
}
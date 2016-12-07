/**
 * Created by Samy on 06.11.2016.
 */

var schemaTracking = require('../models/tracking');

var Tracking = schemaTracking.user;


//Add User in db
//if post is used in form, this function is going to execute
exports.setTrackedSession = function (req,res) {
    //ToDo req.get(user_id) prüfen
    var track = new Tracking(req.body);

    track.save(function(err) {
        if (err) throw err;

        console.log('User created!');
    });
    res.jsonp(track);

    console.log(req.body.username+" geadded");


}

//Check if user exist
exports.getTrackedSession = function (req,res) {
    console.log("getting Tracked Session")
    Tracking.find({user_id: req.body.user_id,movie_id: req.body.movie_id},function (err,user) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }

        if(!user.length)
        {
            console.log("Tracksesion nicht gefunden");
        }
        else
        {
            console.log("Tracksesion gefunden");
        }
    })
}
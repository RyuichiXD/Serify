/**
 * Created by Samy on 06.11.2016.
 */

var schemaTracking = require('../models/tracking');

var Tracking = schemaTracking.tracking;


//Add User in db
//if post is used in form, this function is going to execute
exports.setTrackedSession = function (req,res) {
    //ToDo req.get(user_id) prüfen
    Tracking.find({user_id: req.body.user_id,movie_id: req.body.movie_id},function (err,track) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }

        if(!track.length)
        {
            var newTrack = new Tracking(req.body);
            newTrack.save(function(err) {
                if (err)
                    console.log(err);
                else
                    console.log('Track created!');
            });
            res.jsonp(newTrack);

            console.log("user:"+ req.body.user_id +" movie:"+ req.body.movie_id +" inserted");
        }
        else
        {
            console.log("Tracksesion exestiert");
            res.sendStatus(200)
        }
    });

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
            res.sendStatus(404)
        }
        else
        {
            console.log("Tracksesion gefunden");
            res.sendStatus(200);
        }
    });
}
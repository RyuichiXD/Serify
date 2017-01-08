/**
 * Created by Samy on 06.11.2016.
 */
var request = require('request');
var schemaTracking = require('../models/tracking');

var Tracking = schemaTracking.tracking;


//Add Movie Tracking in db
//if post is used in form, this function is going to execute
exports.setTrackedSession = function (req,res) {

    let seenEpisodes =  req.body.seen_episodes;

    Tracking.findOne({user_id: req.body.user_id,movie_id: req.body.movie_id},function (err,track) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }
            //Track not found -> create a new one
        if(!track)
        {
            var newTrack = new Tracking(req.body);

            //###################### store body.season_img in mongo db

            request({
                url: req.body.season_img,
                encoding: null
            }, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    body = new Buffer(body, 'binary');

                    newTrack.season_img.data = body;
                    newTrack.season_img.contentType = 'image/jpg';


                    // store poster_img in mongo db
                    request({
                        url: req.body.poster_img,
                        encoding: null
                    }, function(error, response, body) {
                        if (!error && response.statusCode === 200) {
                            body = new Buffer(body, 'binary');

                            newTrack.poster_img.data = body;
                            newTrack.poster_img.contentType = 'image/jpg';

                            newTrack.save(function(err) {
                                if (err)
                                    console.log(err);
                                else
                                    console.log('Track created!');
                            });
                        }
                    });
                }
            });
            
            //save in db
            res.jsonp(newTrack);

            console.log("user:"+ req.body.user_id +" movie:"+ req.body.movie_id +" inserted");
        }
        else
        {
            // update the tracking
            track.num_of_ratings = req.body.num_of_ratings ;
            // check if the episode is already in array
            if(!(track.seen_episodes.indexOf(seenEpisodes) > -1))
            {   // add episode
                track.seen_episodes.push(seenEpisodes);

                track.save(function(err) {
                    if (err)
                    {
                        console.log("Fehler beim speichern der Tracksesion "+ err);
                    }
                    else
                        console.log("Tracksesion exestiert und wurde upgedated" + track);
                });
            }
            else
                {
                    //remove track
                    var index =  track.seen_episodes.indexOf(seenEpisodes);
                    if(index != -1)
                    {
                        track.seen_episodes.splice(index, 1);
                        track.save(function(err) {
                            if (err)
                            {
                                console.log("Fehler beim speichern der Tracksesion "+ err);
                            }
                            else
                                console.log("Tracksesion exestiert und wurde entfernt" + track);
                        });
                    }
                    else
                    {
                        console.log("Gesehene Episode wurden nicht gefunden");
                        res.sendStatus(404);
                    }
                }
            res.sendStatus(200)
        }
    });
}

//Delete a session
exports.deleteTrackedSession = function (req,res) {
    console.log("getting Tracked Session")
    Tracking.remove({user_id: req.body.user_id,movie_id: req.body.movie_id},function (err,tracking) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }

        if(!tracking.length)
        {
            console.log("Tracksesion(s) gefunden" + tracking);
            res.sendStatus(200);
        }
        else
        {
            console.log("Tracksesion nicht gefunden");
            res.sendStatus(404);
        }
    });
}

//Get a Session
exports.getTrackedSession = function (req,res) {
    console.log("getting Tracked Session")
    Tracking.find({user_id: req.body.user_id,movie_id: req.body.movie_id},function (err,trackings) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }

        if(!trackings.length)
        {
            console.log("Tracksesion nicht gefunden");
            res.sendStatus(404)
        }
        else
        {
            console.log("Tracksesion(s) gefunden");
            //res.sendStatus(200);
            res.send(trackings);
        }
    });
}

// get all Trackings of an user
exports.getAllTrackingsOfUser = function (req,res) {
    console.log("getting Tracked Session")

    Tracking.find({user_id: req.body.user_id},function (err,trackings) {
        if (err)
        {
            console.log("Fehler beim finden der Tracksesion "+ err);
        }

        if(!trackings.length)
        {
            console.log("Filme nicht gefunden");
            res.sendStatus(404)
        }
        else
        {
            console.log("Tracksesion(s) gefunden");
            //res.sendStatus(200);
            res.render("dashboard", {trackings: trackings});
        }
    })
}
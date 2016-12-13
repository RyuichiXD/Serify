/**
 * Created by Samy on 04.12.2016.
 */


var mongoose = require('mongoose');

var TrackingSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    movie_id: {type: String, required: true},
    num_of_ratings: { type: Number, default: 0},
    seen_episodes: [{type: String}],
    createdAt: { type : Date, default : Date.now }
});
//name of collection in the db
module.exports.tracking = mongoose.model('trackings', TrackingSchema);

// ToDO movie_id = MovieID von der Database
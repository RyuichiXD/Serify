/**
 * Created by Samy on 04.12.2016.
 */


var mongoose = require('mongoose');

var TrackingSchema = new Schema({
    user_id: {type: String, unique: true, required: true},
    movie_id: {type: String, unique: true ,required: true},
    num_of_ratings: { type: Number, default: 0},
    createdAt: { type : Date, default : Date.now }
});

module.exports = mongoose.model('Tracking', TrackingSchema);

// ToDO movie_id = MovieID von der Database
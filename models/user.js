/**
 * Created by Samy on 31.10.2016.
 */

var mongoose = require('mongoose');


// example
var userSchema = new mongoose.Schema({
    created: { type: Date, default: Date.now }
    , username: String
    , email: String
    , password: String
});

// Let mongoose know about the new Schema
var User = mongoose.model('User', userSchema);


//
// // add something
// var thor = new User({
//     title: 'Thor'
//     , rating: 'PG-13'
//     , releaseYear: '2011'  // Notice the use of a String rather than a Number - Mongoose will automatically convert this for us.
//     , hasCreditCookie: true
// });
//
// thor.save(function(err, thor) {
//     if (err) return console.error(err);
//     console.dir(thor);
// });
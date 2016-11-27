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
var User = mongoose.model('users', userSchema);

exports.user = User;


// todo Session key ? Clemens fragen


const Request = require('request-promise');
const wrap = require('co-express');
var url_popular = "https://api.themoviedb.org/3/tv/popular?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US&sort_by=popularity.desc&page=1";
var url_topRated = "https://api.themoviedb.org/3/tv/top_rated?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US&page=1";
var url_discover = "https://api.themoviedb.org/3/discover/tv?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US&sort_by=popularity.desc&page=1";

function getPopular() {
    return Request(url_popular).then(JSON.parse);
};

function getTopRated() {
    return Request(url_topRated).then(JSON.parse);
};

function getDiscover() {
    return Request(url_discover).then(JSON.parse);
};


exports.getHome = wrap(function * (req, res) {

    const popular = yield getPopular();
    const topRated = yield getTopRated();
    const discover = yield getDiscover();
    var username = req.session.user;
    console.log(req.session.user);

    res.render("home", {
        popular: popular,
        topRated: topRated,
        discover: discover,
        user: req.session.user
    });
});

var schema = require('../models/user');

var User = schema.user;


const usersController = require('../controller/userController');
const homeController = require('../controller/homeController');
const searchController = require('../controller/searchController');
const seriesController = require('../controller/seriesController');
const trackingController = require('../controller/trackingController');



module.exports = function(app) {

    app.use(function(req, res, next) {
        res.locals.user = null;
        if (req.session && req.session.user) {
            User.findOne({email: req.session.user.email}, function(err, user){
                if (user) {
                    req.user = user;
                    delete req.user.password;
                    req.session.user = req.user;
                    res.locals.user = user;
                }
                next();
            })
        }
        else next();
    });

    app.get("/", homeController.getHome);
    app.get("/search", searchController.getSearch);
    app.get("/serie/:serien_id",seriesController.getSerie);
    //User controll
    app.get("/login", usersController.getLogin);
    app.post("/login/check", usersController.check);
    app.post('/login/register', usersController.post);
    //Tracking control
    app.post("/setTracking",trackingController.setTrackedSession);
    app.post("/getTrackings",trackingController.getTrackedSession);
    app.post("/dashboard",trackingController.getAllTrackingsOfUser);
    app.post("/removeTracking",trackingController.deleteTrackedSession);
};
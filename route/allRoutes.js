const usersController = require('../controller/userController');
const homeController = require('../controller/homeController');
const searchController = require('../controller/searchController');
const seriesController = require('../controller/seriesController');

module.exports = function(app) {

    app.get("/", homeController.getHome);
    app.get("/search", searchController.getSearch);
    app.get("/serie/:serien_id",seriesController.getSerie);
    app.get("/login", usersController.getLogin);
    app.post("/login/check", usersController.check);
    app.post('/login/register', usersController.post);

};
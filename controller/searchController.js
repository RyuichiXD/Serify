var request = require("request");



exports.getSearch = function(req, res){
    var title = req.query.title;
    var url = "https://api.themoviedb.org/3/search/tv?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US&query=" +title;

    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var series = JSON.parse(body);
            res.render("result", {series:series});
        }
    });
};

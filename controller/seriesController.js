var request = require("request");

exports.getSerie = function(req, res){
    var id = req.params.serien_id;
    var url = "https://api.themoviedb.org/3/tv/" + id + "?api_key=b0b76e71443fa8e798d4ee211e73e3e1&language=en-US";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var serie = JSON.parse(body);
            res.render("serie", {serie:serie});
        }
    });
};
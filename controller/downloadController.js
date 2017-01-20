exports.getDownload = function (req, res) {

    res.render("download", {user: req.session.user});

};
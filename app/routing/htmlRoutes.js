// use path
var path = require("path");

// export routes to server
module.exports = function(app) {
    // route to home page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/home.html"));
    });
    // route to questions
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname + "/../public/survey.html"));
    });
}
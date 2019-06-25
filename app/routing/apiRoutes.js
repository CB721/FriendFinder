// require friends data
var friends = require("../data/friends")

module.exports = function (app) {
    // json friends
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // add to friends
    app.post("/api/friends", function (req, res) {
        // set default for initial score comparison
        var friendMatch = {
            name: "",
            photo: "",
            score: 60
        };
        
        // get results from surver
        var userData = req.body;

        // get scores from results
        var userScores = userData.scores;

        // difference between user scores and friends in db
        var scoreDifference = 0;

        // get all friends from server
        for (var i = 0; i < friends.length; i ++) {
            // set difference to 0
            scoreDifference = 0;

            // go through scores for current friend in iteration
            for (var c = 0; c < friends[i].scores.length; c++) {
                // calculate difference between scores and add to score difference
                // can be the same iteration [c] because the answers should be for the same question
                scoreDifference += Math.abs(parseInt(userScores[c]) - parseInt(friends[i].scores[c]));

                // replace matched friend only if the difference between their scores is less than the previous match
                if (scoreDifference <= friendMatch.score) {
                    // reset matched friend to current friend in iteration
                    friendMatch.name = friends[i].name;
                    friendMatch.photo = friends[i].photo;
                    friendMatch.score = scoreDifference;
                    console.log("updated score: " + scoreDifference);
                }
            }
        }

        // add new user to the database
        friends.push(userData);

        // friend match for html
        res.json(friendMatch);
    });
}
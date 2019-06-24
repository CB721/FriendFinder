// require friends data
var friends = require("../data/friends")

module.exports = function(app) {
    // json friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    })

    // add to friends
    app.post("/api/friends", function(req, res) {
        var friendMatch = {
            name: "",
            photo: "",
            score: 100
        };

         // get results from surver
         var userData = req.body;

          // get scores from results
        var userScores = userData.scores;

        // difference between user scores and friends in db
        var scoreDifference = 0;

        // get all friends from db
        for (var i = 0; i < friends.length; i += 1) {
            // set difference to 0
            scoreDifference = 0;

            // get scores for current friend in iteration
            for (var c = 0; c < friends[i].scores[c]; c++) {
                // calculate difference between scores and add to friends difference
                scoreDifference += Math.abs(parseInt(userScores[c] - parseInt(friends[i].scores[c])));

                // replace matched friend only if the difference between their scores is less than the previous match
                if (scoreDifference <= friendMatch.score) {
                    // reset matched friend
                    friendMatch.name = friends[i].name;
                    friendMatch.photo = friends[i].photo;
                    friendMatch.score = friends[i].scores;
                }
            }
        }

        // add new user to the database
        friends.push(userData);

        // friend match for html
        res.json(friendMatch);
    })
}
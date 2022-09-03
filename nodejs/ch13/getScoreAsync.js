
//
async function getHighScoreAsync() {
    let response = await fetch("/api/user/profile");
    let profile = await response.json();
    return profile.highScore;
}

exports.getHighScoreAsync = getHighScoreAsync;
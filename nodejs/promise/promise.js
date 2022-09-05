let http = require("http");
const axios = require('axios').default;


function getHighScore() {
    // axios返回值类型是Promise
    return axios.get("http://127.0.0.1:8888/api/user/profile").then(response => {
        // console.log(response.data);
        return response.data;
    }).catch(error => {
        // console.log(error);
    });
}

/**
 * Promise中的返回值要在 async中用await获取
 * @returns {Promise<void>}
 */
async function getHighScoreAsync() {
    let score = await getHighScore();
    // score = {"highScore":100}
    console.log("score = " + JSON.stringify(score));
}

console.log(getHighScore());
// Promise { <pending> }
console.log(getHighScoreAsync());
let http = require("http");
let url = require("url");

function start() {
    function onRequest(request, response) {
        let pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        if (pathname === "/api/user/profile") {
            let profile = {highScore: 100};
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(profile));
        }
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;

const fs = require("fs");
let options = {};

function startProgram(options) {
    console.log(JSON.stringify(options));
}

fs.readFile("../package.json", "utf-8", (err, text) => {
    if (err) {
        console.log("could not read file:", err);
    } else {
        Object.assign(options, JSON.parse(text));
    }
    startProgram(options);
});


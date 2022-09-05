// 示例 13-1；异步getJSON函数

const http = require("http");

// 返回值是一个期约
function getJSON(url) {
    // 创建并返回一个新的期约
    return new Promise(((resolve, reject) => {
        let request = http.get(url, response => {
            if (response.statusCode !== 200) { // 状态码不对，拒绝期约
                reject(new Error(`HTTP status ${response.statusCode}`));
                response.resume(); // 防止内存泄露
            } else if (response.headers["content-type"] !== "application/json") { // 响应头不对，拒绝期约
                reject(new Error("Invalid content-type:" + response.headers["content-type"]));
                response.resume(); // 防止内存泄露
            } else {
                let body = "";
                response.setEncoding("utf-8");
                response.on("data", chunk => {
                    body += chunk;
                });
                response.on("end", () => {
                    try {
                        let parsed = JSON.parse(body);
                        // 解析成功，兑现期约
                        resolve(parsed); // 返回的是parsed
                        console.log(parsed);
                    } catch (e) {
                        // 解析失败，拒绝期约
                        reject(e);
                    }
                });
                // 响应之前请求失败，拒绝期约
                response.on("error", error => {
                    reject(error);
                });
            }
        });
    }));
}

let json = getJSON("http://127.0.0.1:8888/api/user/profile").then(json => json);
console.log(json); // Promise { <pending> }
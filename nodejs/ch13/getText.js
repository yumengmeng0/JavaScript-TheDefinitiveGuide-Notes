const https = require("https");


// 读取URL的文本内容，将其异步传给回调
function getText(url, callback) {
    // 对URL发送一个get请求
    let request = https.get(url);

    // 注册一个处理response事件的函数
    request.on("response", response => {
        // 这个响应意味着收到了响应头
        let httpStatus = response.statusCode;

        response.setEncoding("utf-8");
        let body = "";

        response.on("data", chunk => {
            body += chunk;
        });

        response.on("end", () => {
            if (httpStatus === 200) {
                callback(null, body);
            } else {
                callback(httpStatus, null);
            }
        });

    });


    request.on("error", err => {
        callback(err, null);
    });

}

function callback(status, body) {
    console.log("status", status);
    console.log("body:", body);
}


getText("https://www.baidu.com/", callback);
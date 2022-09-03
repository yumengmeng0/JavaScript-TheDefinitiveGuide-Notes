// 期约链

const documentURL = "";

fetch(documentURL)
    .then(response => response.json())
    .then(document => {
        return render(document);
    })
    .then(rendered => {
        cacheInDatabase(rendered);
    })
    .catch(error => handle(error));

function render(input) {

}

function cacheInDatabase(input) {

}

function handle(error) {

}


fetch("/api/user/profile").then(response => {
    // 在期约解决时，可以访问HTTP状态头部
    if (response.ok && response.headers.get("Content-Type") === "application/json") {

    }
});

// 使用期约的幼稚方式
fetch("/api/user/profile").then(response => {
    response.json().then(profile => { // 获取JSON格式的响应体
        // 在响应体到达时，它会自动被解析为JSON格式并传入这个函数
        displayProfile(profile);
    });
});

// 使用期约的首先方式
fetch("")
    .then(response => {
        return response.json();
    })
    .then(profile => {
        displayProfile(profile);
    });

/*
fetch(theURL)           // 任务1，返回期约1
    .then(callback1)    // 任务2，返回期约2
    .then(callback2);   // 任务3，返回期约3
 */

/// 13.2.3 解决期约
function c1(response) {         // 回调1
    let p4 = response.json();
    return p4;  // 返回期约4，并不是一个JSON对象
}

function c2(profile) {  // 回调2
    displayProfile(profile);
}

let p1 = fetch("/api/user/profile");   // 任务1，返回期约1
let p2 = p1.then(c1);                        // 任务2，返回期约2
let p3 = p2.then(c2);                        // 任务3，返回期约3
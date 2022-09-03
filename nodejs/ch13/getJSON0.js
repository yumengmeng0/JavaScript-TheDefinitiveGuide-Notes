function getJSON(url, callback) {

}

let url = "https://www.xx.com";

getJSON(url, jsonData => {
    // 这是一个回调函数，它会解析得到JSON值，之后被异步调用，并接收JSON值作为参数
});

// 显示用户简介
function displayProfile(profile) {
    console.log(profile)
}

function handleProfileError(error) {
    console.log(error)
}


getJSON("/api/user/profile").then(displayProfile, handleProfileError);

getJSON("/api/user/profile").then(displayProfile, null).catch(handleProfileError);



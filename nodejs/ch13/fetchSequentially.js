// Sequentially 依次
function fetchSequentially(urls) {
    // 抓取URL时把响应体保存在这里
    const bodys = [];

    // 返回一个期约，它只抓取一个URL的响应体
    function fetchOne(url) {
        return fetch(url)
            .then(response => response.text())
            .then(body => {
                // 把响应体保存到数组，省略返回值，返回undefined
                bodys.push(body);
            });

        // 从一个立即（以undefined值）兑现的期约开始
        let p = Promise.resolve(undefined);

        for (url of urls) {
            p = p.then(() => fetchOne(url));
        }

        return p.then(() => bodys);
    }
}

const urls = [];
fetchSequentially(urls)
    .then(bodies => {/* 处理抓到的字符串数组 */
    })
    .catch(e => console.error(e));
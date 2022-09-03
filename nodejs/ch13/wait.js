function wait(duration) {
    // 创建并返回新期约
    return new Promise((resolve, reject) => { // 这两个函数控制期约
        // 参数无效，拒绝期约
        if (duration < 0) {
            reject(new Error("Time travel not yet implemented"));
        }

        // 异步等待，解决期约
        // setTimeout调用resolve()未传参，新期约会以undefined值兑现
        setTimeout(resolve, duration);

    });
}
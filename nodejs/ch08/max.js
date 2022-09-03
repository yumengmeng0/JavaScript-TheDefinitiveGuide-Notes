// arguments是Arguments类型的隐式的可变参数列表对象
function max() {
    let maxValue = -Infinity;
    // 遍历arguments
    for (let i = 0; i < arguments.length; i++) {
        if (arguments[i] > maxValue) maxValue = arguments[i];
    }
    return maxValue;
}

function max1(...values) {
    let maxValue = -Infinity;
    // 遍历arguments
    for (let i = 0; i < values.length; i++) {
        if (values[i] > maxValue) maxValue = values[i];
    }
    return maxValue;
}

console.log(max(5, 4, 6, 8, 1));
console.log(max1(5, 4, 6, 8, 1));
# 第 13 章-异步 JavaScript

浏览器中的 JavaScript 程序是典型的事件驱动型程序。  
ES6 新增的期约（Promise）是一种对象，代表某个异步操作尚不可用的结果。  
关键字 async 和 await 是 ES2017 中引入的，为简化异步编提供的新语法，允许开发者基于期约的异步代码写成同步形式。  
异步迭代器和 for/await 循环是 ES2018 中引入的，允许在看起来同步的简单循环中操作异步时间流。

## 13.1 使用回调的异步编程

    JavaScript异步编程是使用回调实现的。
    回调就是函数，可以传给其他函数。

### 13.1.1 定时器

[定时器](ch13/13.1.1定时器.html)

### 13.1.2 事件

[事件](ch13/13.1.2事件.html)

### 13.1.3 网络事件
[网络事件.html](ch13/13.1.3网络事件.html)

### 13.1.4 Node中的回调与事件
Node.js服务器端JavaScript环境底层就是异步的，定义了很多使用回调和事件的API。

## 13.2 期约

- 期约是一个对象，表示异步操作的结果。这个结果可能就绪也可能为就绪。
- 没有办法同步取得期约的值，只能要求期约在值就绪时调用一个回调函数。

期约解决的问题：

- 回调多层嵌套，代码难阅读。
- 回调难以处理错误。

期约表示一次异步计算的未来结果，不能表示重复的异步计算。

### 13.2.1 使用期约

### 使用期约处理错误
对期约而言，通过给then()方法传的第二个函数来实现错误处理。

基于期约的异步计算在正常结束后，会把计算结果传给作为then()的第一个参数的函数，
把异常（通常是Error对象），传给作为then()的第二个参数的函数。


```js
  

```

#### 期约的相关术语
- 兑现（fulfill）：then()方法的第一个回调被调用
- 拒绝（reject）：then()方法的第二个回调被调用
- 待定（pending）：既未兑现也未拒绝
- 落定（settle）；期约一旦被兑现或拒绝
- 解决（resolve）：

### 13.2.2 期约链

fetch().then().then()

方法链：一个表达式调用多个方法。
API被设计为方法链时指挥有一个对象，它的每个方法都返回对象本身，以便后续调用。
期约不是以这种方式工作。then()方法每次都返回一个新期约对象。

### 13.2.3 解决期约

### 13.2.4 再谈期约与错误
期约的 .catch() 方法实际上是对以null为第一个参数，以错误处理回调为第二个参数的
.then() 调用的简写。

p.then(null, c) 等价于 p.catch(c)


如果期约链的某一环会因错误而失败，而该错误属于某种可恢复的错误，不应该停止后续环节代码的运行，
那么可以插入一个.catch()调用。
```js
    startAsyncOperation()
        .then(doStageTwo)
        .catch(recoverFromStageTwoError)
        .then(doStageThree)
        .then(doStageFour)
        .catch(logStateThreeAndFourErrors);
    
```

.catch() 回调不仅可以用于报告错误，还可以处理错误并从错误中恢复。

#### 从期约回调中返回

```js
    queryDatabase()
        .then(displayTable)
        .catch(displayDatabaseError)

    queryDatabase()
        .catch(e => wait(500).then(queryDatebase)) // 如果失败，等待并重试
        .then(displayTable)
        .catch(displayDatabaseError)
    
    // 加上{}无法利用自动返回
    .catch(e => { wait(500).then(queryDatebase)} ) // 返回的是undefined，而不是期约
```

### 13.2.5 并行期约
Promise.all()：接收一个期约对象数组，返回一个期约。
Promise.allSettled()：永远不拒绝返回的期约，等所有输入的期约全部落定后兑现。
Promise.race()：返回一个期约，只关心第一个兑现值或非期约值。
```js
    // 先定义一个URL数组
    const urls = [/*多个URL*/];
    // 然后转换为哟个期约对象的数组
    promises = urls.map(url => fetch(url).then(r => r.text()));
    // 现在用一个期约来并行运行数组中所有期约
    Promise.all(promises)
            .then(bodies => {/* 处理得到的字符串 */ })
            .catch(e => console.log(e));
```
```js
    Promise.allSettled([Promise.resolve(1), Promise.resolve(2), 3]).then(result =>{
        result[0] // => {status:"fulfilled", value:1}
        result[1] // => {status:"rejected", value:2}
        result[2] // => {status:"fulfilled", value:3}
    });
```

### 13.2.6 创建期约

#### 基于其他期约的期约
```js
    function getJSON(url) {
        return fetch(url).then(response => response.json());
    }

    function getHighScore() {
        return getJSON("/api/user/profile").then(profile => profile.highScore);     
    }
```
#### 基于同步值的期约
- Promise.resolve()接收一个值作为参数，并返回（但异步）以该值兑现的期约。
- Promise.reject()接收一个参数，并返回一个以该参数作为理由拒绝的期约。

#### 从头开始创建期约
[getJSON.js](nodejs/ch13/getJSON.js)

### 13.2.7 串行期约


## 13.3 async和await


### 13.3.1 await表达式
await接收一个期约并将其转换为一个返回值或一个抛出的异常。
*任何使用await的代码本身都是异步的。*

```js
    let response = await fetch("/api/user/profile");
    let profile = await response.json();
```

### 13.3.2 async函数

因为任何使用await的代码都是异步的，所以*只能在以async关键字声明的函数内部使用await*。

函数声明为async返回值是期约，即使函数中不出现期约相关的代码。
如果async函数正常返回，作为该函数真正的返回值的期约对象将解决为这个明显的返回值，
如果抛出异常，返回的期约对象将以该异常被拒绝。


```js
    async function getHighScore() {
        let response = await fetch("/api/user/profile");
        let profile = await response.json();
        return profile.highScore;
      
    }

    async function displayHighScore(){
    
    }

    async function f() {
        var promise = displayHighScore(await getHighScore()); //这行代码只能在async函数内部运行
    }
```

在顶级或非async函数内部，不能使用async关键字，必须以常规方式来处理返回的期约：
```js
    getHighScore().then(displayHighScore).catch(console.error);
```



### 13.3.3 等候多个期约
async函数本质上等于期约的。

```js
    async function getJSON(url) {
        let response = await fetch(url);
        let body = await response.json();
        return body;
    }
    
    async function f(...urls){
        let value1 = await getJSON(urls[0]);  
        let value2 = await getJSON(urls[1]);  
        
        let [v1, v2]= new Promise.all([getJSON(urls[0],getJSON(urls[1]]);
    }

```

### 13.3.4 实现细节
```js
    async function f(x){}

    // 可以把这个函数想象成：一个返回期约的包装函数，它包装了原始函数的函数体
    function f1() {
        return new Promise((resolve, reject) => {
            try {
              resolve((function (x) {})(x)) // 包装原始函数的函数体
            }catch (e) {
              reject(e);
            }
        });
    }
```

# NOTES
## [1. 获取有返回值的 Promise 的返回值（以Axios为例）](nodejs/promise/promise.js)


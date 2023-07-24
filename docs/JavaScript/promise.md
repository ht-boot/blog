---
title: Promise
outline: deep
author: ht
date: 2021-6
tags: ['javascript']
---

### 🥧 搞懂 Promise

:::tip 什么是Promise? 
Promise 是异步编程的一种解决方式，它是一个构造函数，可以获取异步的操作的消息。

当通过 new Promise 创建一个实例时，需要传入一个回调函数，这个回调函数会被立即执行，并传入两个回调参数 resolve、reject。
- 当调用 resolve 函数时，会执行 Promsie 对象 then 方法的回调。
- 当调用 reject 函数时， 会执行 Promise 对象 catch 方法的回调。

Promise 有三种状态：① pending 等待、 ② fulfiled 成功、 ③ rejected 失败 。 状态一旦改变， 就不还再变了。

:::

```js
// Promise 基本使用方式
 const p = new Promise((resolve, reject) => {
    let num = Math.floor(Math.random() * 10)
    if (num > 5) {
        resolve('success')
    } else {
        reject('error')
    }
})

p.then((res) => {
    console.log(res);
}).catch((err) => console.log(err))

```

#### 🔵 resolve 参数

- 如果 resolve 传入的参数是普通值或者对象， 那么会被传入到 then 的参数中。
- 如果 resolve 传入的参数是 Promise， 那么当前的Promise状态由传入的Promise决定。

```js
const p = new Promise((resolve, reject) => {
    resolve('ok')
})

new Promise((resolve, reject) => {
  // 当前 Promise 的状态由传入的 Promise 去决定
  resolve(p)
})
 .then(res => console.log(res)) // ok
 .catch(err => console.log(err))


 // 如果传入的对象实现 then 方法，则会执行 then 方法， 由该方法决定状态。
 new Promise((resolve, reject) => {
    resolve({
        then(resolve, reject) {
            reject('error')
        }
    })
 })
    .then(res => console.log(res))
    .catch(err => console.log(err)) // error

```

#### 🔵 Promise 的静态方法

1. ##### 🔵 all

Promise.all() 接收一组可迭代对象， 并返回一个Promise,. 如果输入的迭代对象有任何一个被拒绝，那么返回的Promise被拒绝，返回第一个被拒绝的原因。

```js 

const err = new Promise((resolve, reject) => {
    reject('error')
})

const pro = Promise.all([1, err, 3])

pro.then(res => console.log(res)) // Uncaught (in promise) error

```

2. ##### 🔵 any

Promise.any() 接收一组的迭代对象， 当其中有任意一个 promise 成功， 返回那个成功的 promise 对象。 *** promise 对象中没有一个成功(所有的 promise 都失败)， 则返回一个失败的 promise ***

```js

const err = new Promise((resolve, reject) => {
    reject('error')
})

const pro = Promise.any([1, 3, err])

pro.then(res => console.log(res)) // 1

```

3. #### 🔵 race

Promise.race() 接收一组可迭代对象， 只要有一个 promise 状态率先改变， 那么返回率先改变状态的 promise 对象，无论成功还是失败。

```js

const err = new Promise((resolve, reject) => {
    reject('error')
})

const pro = Promise.race([1, 3, err])

pro.then(res => console.log(res)) // 1

```

4. #### 🔵 allSettled

Promise.allSettled() 接收一组可迭代对象， 等到所有 promise 完成后（每个 promise 成功或失败）。兑换成一个数组对象， 里面对应每个 promise 结果。

```js
const err = new Promise((resolve, reject) => {
     reject('error')
 })


const pro = Promise.allSettled([err, 1, 2])

pro.then(res => console.log(res))
/**
 * @param res
 * [
 *  {status: 'rejected', reason: 'error'}, 
 *  {status: 'fulfilled', value: 1}, 
 *  {status: 'fulfilled', value: 2}
 * ]
 */

```
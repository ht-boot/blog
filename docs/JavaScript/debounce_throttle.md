---
title: Js 防抖与节流
outline: deep
author: ht
date: 2022-5
tags: ['JavaScript']
---

### 🔵 防抖与节流

为什么要用到防抖与节流？

> 当函数绑定的一些特殊事件： 例如resize、scroll、 多次点击按钮等。会频繁触发函数，带来性能的下降与资源请求频繁。

#### 🟡 防抖

> 指事件触发 n 秒后在执行，若在 n 秒内继续触发，则时间重新计时。

```js

function debounce(func, delay = 500) {
    let timer = null;
    return function (...args) {
        const that = this
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(that, args);
        }, delay)
    }
}

```


#### 🟡 节流

> 指连续触发事件但是在 n 秒中只执行一次函数。

```js
function throttle(func, delay = 500) {
    let timer = null
    return function (...args) {
        const that = this
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(that, args)
                timer = null
            }, delay)
        }
    }
}

```



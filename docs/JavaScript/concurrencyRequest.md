---
title: 并发任务控制
outline: deep
author: ht
date: 2023-5
tags: ["JavaScript"]
---

## 并发任务控制

废话不多说， 直接上代码

```js
function concurrencyRequest(urlArr, max) {
  return new Promise((resolve, reject) => {
    if (urlArr.length === 0) {
      resolve([]);
      return;
    }

    let result = []; // 所有请求返回结果集合
    let index = 0; // 当前url下标

    async function next() {
      let i = index;
      const url = urlArr[index];
      index += 1;
      try {
        const res = await fetch(url);
        result[i] = res;
      } catch (error) {
        result[i] = error;
      } finally {
        if (index === urlArr.length) {
          resolve(result);
          return;
        }
        next();
      }
    }

    // max和urlArr.length取最小进行调用;
    const times = Math.min(max, urlArr.length);
    for (let i = 0; i < times; i++) {
      next();
    }
  });
}

const arr = [];

for (let i = 0; i < 20; i++) {
  arr.push(`http://127.0.0.1:8888/id?id=${i}`);
}

concurrencyRequest(arr, 6).then((data) => console.log(data));
```

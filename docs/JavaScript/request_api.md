---
title: Axios 与 Fetch 区别
outline: deep
author: ht
date: 2022-6
tags: ["javascript", "网络请求"]
---

## Fetch 和 Axios 到底有什么区别

Axios 是对 XMLHttpRequest 的封装，而 Fetch 是一种新的获取资源的接口方式，并不是对 XMLHttpRequest 的封装。
它们最大的不同点在于 Fetch 是浏览器原生支持，而 Axios 需要引入 Axios 库。

|                | Axios                                                      | Fetch                                                                    |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| 兼容性         | 兼容 IE                                                    | whatwg-fetch                                                             |
| 响应超时       | timeout 简单易用                                           | setTimeout + new AbortController()                                       |
| 对数据转化     | 自动对数据进行转化 response.data                           | 手动转化需要清楚请求后的数据类型是什么，然后再用对应的方法将它进行转换。 |
| HTTP 拦截器    | 请求附加 token、为请求增加时间戳防止请求缓存，以及拦截响应 | Fetch 没有拦截器功能，如果需要直接重写全局 Fetch 方法就可以办到 麻烦。   |
| 浏览器原生支持 | 不支持                                                     | 支持                                                                     |

### Axios

Axios 是一个基于 Promise, XHR 二次封装形成的网络请求库，作用于 Node.js 和浏览器中。

客户端 Axios 的主要特性有：

- 从浏览器创建 XMLHttpRequests
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

[Axios 使用参考](https://www.axios-http.cn/)

### Fetch

新的 JavaScript 的接口。而且 fetch api 天生就是自带 Promise 的。

实例：

```js
fetch("http://example.com/movies.json")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

[Fetch 使用参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

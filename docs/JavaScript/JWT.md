---
title: 什么是JWT
outline: deep
author: ht
date: 2024-1
tags: ["javascript"]
---

## 什么是 JWT？

`JWT 是 JSON Web Token 的缩写。它是一个开放的标准（[RFC 7519](https://tools.ietf.org/html/rfc7519)），用于在网络应用环境间传递声明。JWT 声明通常被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源，也可以增加一些额外的其它业务逻辑所必须的声明信息，该token也可直接被用于认证，也可被加密。`

JWT 由三部分组成：头部（Header）、载荷（Payload）和签名（Signature）。

**头部（Header）**：`包含了关于生成该 JWT 的信息以及所使用的算法类型。`

**载荷（Payload）**：`包含了要传递的数据，例如身份信息和其他附属数据。`

**签名（Signature）**：`使用密钥对头部和载荷进行签名，以验证其完整性。`

JWT 官网 [(jwt.io)](https://jwt.io/)

## 为什么要用 JWT？

> JWT 相较于传统的基于会话（Session）的认证机制，具有以下优势：
>
> 1. **无需服务器存储状态**:传统的基于会话的认证机制需要服务器在会话中存储用户的状态信息，包括用户的登录状态、权限等。而使用 JWT，服务器无需存储任何会话状态信息，所有的认证和授权信息都包含在 JWT 中，使得系统可以更容易地进行水平扩展。
> 2. **跨域支持**: 由于 JWT 包含了完整的认证和授权信息，因此可以轻松地在多个域之间进行传递和使用，实现跨域授权。
> 3. **适应微服务架构**:在微服务架构中，很多服务是独立部署并且可以横向扩展的，这就需要保证认证和授权的无状态性。使用 JWT 可以满足这种需求，每次请求携带 JWT 即可实现认证和授权。
> 4. **自包含**:JWT 包含了认证和授权信息，以及其他自定义的声明，这些信息都被编码在 JWT 中，在服务端解码后使用。JWT 的自包含性减少了对服务端资源的依赖，并提供了统一的安全机制。
> 5. **可扩展**:JWT 可以被扩展和定制，可以按照需求添加自定义的声明和数据，灵活性更高。

## JWT 基本使用

这里以 node 环境为例：

```js
const express = require("express");
const app = express();
const bosyParser = require("body-parser");
const jwt = require("jsonwebtoken"); //加载包
app.use(bosyParser.json()); //解析json数据

//跨域
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //  例如 允许百度跨域， 把上面这行的*替换为 https://baidu.com
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == "options") {
    res.sendStatus(200); //让options预验证尝试请求快速结束
  }
  next();
});

const user = { name: "admin", password: "123456" }; //储存账号,模拟数据库
const theKey = "mykey"; //定义密匙

//登录
app.post("/login", (req, res) => {
  if (JSON.stringify(user) === JSON.stringify(req.body)) {
    let token = jwt.sign(user.name, theKey); //生成token
    //账号密码正确
    res.json({ code: 0, token, data: user });
  } else {
    res.json({ code: 1, data: "账号或密码错误" });
  }
});

//中间件，校验token
let autoCheck = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (token) {
    req.token = token;
    next();
  } else {
    res.json("token失效");
  }
};

//获取列表数据
app.get("/list", autoCheck, (req, res) => {
  const token = req.token;
  jwt.verify(token, theKey, (err, data) => {
    //data为解码之后的数据，即name
    if (!err) {
      res.json({ code: 0, data });
    } else {
      res.json({ code: 1, data: "token签名错误" });
    }
  });
});

app.listen(4000, () => {
  console.log("4000端口启动了");
});
```

这样我们前端调用接口的时候就可以获取 token,并将其放在请求头中,这样后端就可以通过请求头中的 token 来校验用户是否登录了。

## 分析

JWT 本质是将**秘钥存放在服务器端，并通过某种加密手段进行加密和验证的机制**。加密签名=某加密算法(header+payload+服务器端私钥)，因为服务端私钥别人不能获取，所以 JWT 能保证自身其安全性。

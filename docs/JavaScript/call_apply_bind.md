---
title: this 更改
outline: deep
author: ht
date: 2021-6
tags: ["javascript"]
---

## 🆎 各之间的区别

### 🟥 call/apply

- call(this, arg1, arg2, ...) 接收的参数是参数列表。
- apply(this, [argumnet]) 接收的参数是一个数组。

### 🟪 bind

- bind(this, arg1, arg2, ...) 方法创建一个新的函数, 需要自己调用。

### 🟥 实现原理

```js
var name = "wang";

const person = {
  name: "ming",
  say() {
    console.log(this.name);
  },
  // 自定义，取代call方法
  otherSay(arg) {
    console.log(this.name);
  },
};
person.say.call(window); // wang
person.otherSay(window); // wang
```

### 🖊️ 手写 call

```js
Function.prototype.MyCall = function (context, ...argus) {
  context =
    context === null || context === undefined ? window : Object(context);

  const key = Symbol(); // 创建一个唯一值，防止属性值被覆盖

  context[key] = this;
  const func = context[key](...argus);
  delete context.key; // 执行后删除新增属性
  return func;
};
```

### 🖊️ 手写 apply

```js
Function.prototype.MyApply = function (context, argus = []) {
  context =
    context === null || context === undefined ? window : Object(context);

  const key = Symbol(); // 创建一个唯一值，防止属性值被覆盖

  context[key] = this;
  const func = context[key](...argus);
  delete context.key; // 执行后删除新增属性
  return func;
};
```

### 🖊️ 手写 bind

```js
Function.prototype.Mybind = function (context, ...argus) {
  context =
    context === null || context === undefined ? window : Object(context);

  return (...params) => {
    this.apply(context, [...argus, ...params]);
  };
};
```

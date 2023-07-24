---
title: TypeScript
outline: deep
author: ht
date: 2021-6
tags: ['TypeScript']
---

### 🟦 TypeScript

推荐 [学习地址](https://www.tslang.cn/docs/handbook/basic-types.html)。

以下笔记，主要记录遇到的难点、疑点、项目中的不足点。


### 🟦 TypeScript 安装

1. 确保电脑安装Node.js, 输入 npm install -g typescript。
2. 安装完成后 输入 tsc -v 查看版本，出现版本号表明安装成功。

```js
npm install -g typescript

tsc -v

```

3. 创建一个ts文件

```ts

// demo.ts

let name: string = 'lib'

```

4. 浏览器与node环境不能直接运行 ts 文件，要将 ts 编译成 js。 在终端输入 tsc demo.ts

```sh

tsc demo.ts

```

5. 会生成一个 js 文件

```js
// dmeo.js
var name = "lib"
```
---
title: TS 泛型
outline: deep
author: ht
date: 2023-1
tags: ['TypeScript']
---

### 1️⃣ TS 的参数约束（案例）

项目在编码中，出现这么一个问题，要对工具函数的参数进行约束， 这个函数有两个参数 func(obj, param), 一个对象(obj)还有一个对象的属性(param)， 且param 必须时 obj 的属性。
起初定义类型如下：
```ts
function handle(obj: object, param: string) {}

function({name: 'LI'}, 'name')
```
发现第二个参数（param）随便传一个string类型的都可以，没有起到参数约束的效果。

```ts
// 修改版
const user = {
    username: 'admin',
    password: '123456'
}

function handle<T extends object, K extends keyof T>(obj: T, param: K ) {} // 完美解决

handle(user, 'username')
```


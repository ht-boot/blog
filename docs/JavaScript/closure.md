---
title: Js 闭包
outline: deep
author: ht
date: 2021-7
tags: ['javascript']
---

### 🔄 闭包

> <p style="color: #DB7093"> 内部函数有权访问外部函数作用域中内部变量或数据的函数。</p>
>
> 作用: 
>
> ① 保护函数变量不受外部干扰， 形成不被销毁的栈内存。
>
> ② 将函数的属性保存下来，实现方法与变量私有化。

```js

const func1 = () => {
    var dem = 1;
    return func2 = () => {
        return dem += 1
    }
}
const fun = func1()

fun() // 2
fun() // 3

```

### 🛸 使用场景
1. 'return' 回一个函数

2. 函数作为参数 （防抖、节流）
 



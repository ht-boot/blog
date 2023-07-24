---
title: interface与type区别
outline: deep
author: ht
date: 2022-5
tags: ['TypeScript']
---

### 🟦 interface 与 type 区别
>

####  🔷『 interface 』
>
interface (接口) ， 是 ts 设计出来定义对象类型的， 可以对对象进行描述

```ts

interface IPerson {
    name: string;
    age: number
}

const person: Person = {
    name: 'lin',
    age: 18
}

```

####  🔷『 type 』
> 
type (类型别名) 用于给各种类型定义别名，让ts 写起来跟简洁。

```ts

type Obj = {
    name: string;
}

type Name = string

type Func = () => string

type NameOrFunc = Name | Func // 联合类型

function getName =(val: NameOrFunc): Name {

    if (typeof val === 'string') {
        return val
    }
    else {
        return val()
    }
}

```
####  🔷 都允许 extends

interface 与 type 都允许扩展， 但都不是互相独立的, interface 可以 extends type, type 也可以extends interface。

```ts
// interface extends type
type Name = {
    firstName: string
}

interface Person extends Name {
    lastName: string
}


// type extends interface
interface IAnimal {
    dog: string
}

type TAnimal = IAnimal & {
    cat: string
}

```

#### 🔷 不同点

type 可以 interface 不可以

```ts
// type 可以声明基本数据类型别名， 联合类型， 元组。

// 基本数据类型别名
type Name = string
type Id = string | number

//联合类型
type Animal = Dog | Cat

// 元组
type List = [number, string, boolean]

```

interface 可以 type 不可以

```ts

// 声明合并
interface User {
    name: string
    age: number
}

interface User {
    sex: string
}

/*User 接口为 {
    name: string
    age: string
    sex: string
}*/

```





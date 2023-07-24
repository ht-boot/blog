---
title: TS 泛型
outline: deep
author: ht
date: 2022-5
tags: ['TypeScript']
---

### TypeScript 泛型

指在定义函数、接口或类型的时候，不会预先定义接口类型，而是在使用的时候指定接口类型。

常见泛型变量代表：
> - K (Key): 表示对象中的键类型；
> - V (Value): 表示对象中的值类型；
> - T (Type): 表示类型变量；
> - E (Element): 表示元素类型；

```ts

function func<T, U>(value: T, message: U): T { // T 的类型表示为 number， U 的类型表示为 string
    return value
}

func<number, string>(911, '保时捷')
```

### 泛型工具类型
>
#### 1. typeof

在 TS 中， `typeof` 操作符可以用来获取一个变量声明或对象的类型。

```ts
interface Person {
    name: string
    age: number
}

const user: Person = {
    name: 'xiaoming',
    age: 18
}

type User = typeof user; // Person

```

#### 2. keyof

`keyof` 操作符可以获取类型的所有键， 返回类型是联合类型
```ts

interface Preson = {
    name: string;
    age: number;
    sex: string;
}

type P = keyof Person; // 'name' | 'age' | 'sex'


```

#### 3. in

`in` 用来遍历枚举类型

```ts
type Val = 'a' | 'b' | 'c'

type Obj = {
    [item in Val]: any
} 
/*
 Obj 接口类型 {
    a: any
    b: any
    c: any
 }
 */

```

#### 3. extends

当我们想使定义的泛型不想过于灵活或者想继承某些类型时，可以通过 `extends` 关键字添加约束

```ts
// 类型约束
interface Use {
    hammer: string
}

function tools<T extends Use>(arg: T): T {
    return arg
}


// <-------------------->
// 继承类型
interface T1 = {
    name: sting
}

interface T2 = {
    age: number
}

// 多重继承， 逗号隔开
interface T3 extend T1, T2 {
    sex: string
}

// 类型合法
const person: T3 = {
    name: 'xm',
    age: 18,
    sex: '男'
} 
```
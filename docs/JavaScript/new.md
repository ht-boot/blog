---
title: Js new 操作符
outline: deep
author: ht
date: 2021-6
tags: ['javascript']
---

### 🟥 new 的过程做了哪些事？

::: tip new 的过程做了哪些事?
- 1. 创建对象
- 2. 将构造函数上的原型属性复制给创建的对象
- 3. 改变this指向， 将构造函数的this指向更改为新创建的对象
- 4. 返回对象
:::

```js

function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.myFullName = function () {
    console.log(`${this.firstName} ${this.lastName}`)
}

const MyNew = (obj, ...argus) => {

    // Object.create() 以对象作为原型创建一个新的对象。
    const newObj = Object.create(obj.prototype);

    const result = obj.apply(newObj, [...argus])

    // 判断构造函数返回的值，如果是基本数据类型则返回新的实例对象， 是引用数据类型则返回引用数据类型
    return result instanceof Object ? result : newObj;

}


const kun = MyNew(Person, 'kun', 'kun')

kun.myFullName();

```
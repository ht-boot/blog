---
title: 深拷贝与浅拷贝
outline: deep
author: ht
date: 2021-6
tags: ['javascript']
---

### 🟦 浅拷贝与深拷贝
>
#### 🟨 浅拷贝
- 浅拷贝是创建一个新的对象， 对原始对象属性值的一份拷贝， 如果对象属性值是基本数据类型， 那么拷贝的数据就是基本数据。如果属性值是引用数据类型， 那么拷贝的只是内存地址，若对其一个对象进行改变着会影响原始对象属性值。

常见浅拷贝实现方式： <span style="color: red">Object.assign()、 展开运算符 ...</span>


>
#### 🟨 深拷贝
- 深拷贝是将原始对象从内存中完整的拷贝了一份数据，再往堆内存中开辟一个新的区域存放新对象。且修改对象不影响原始对象。

深拷贝实现方式： <span style="color: red">JSON.parse(JSON.stringify())、手写递归、 lodash库的 _.cloneDeep()、MessageChannel()。</span>

##### ✔ MessageChannel()
```js
//  
const person = {
    name: 'xm', age: '18', other: {
        weight: '50kg',
        sex: 'female'
    }
}

const deepClone = (obj) => {
    return new Promise((resolve, reject) => {
        const { port1, port2 } = new MessageChannel()
        port1.postMessage(obj);

        port2.onmessage = (v) => {
            resolve(v.data)
        }
    })
}

deepClone(person).then(res => {
    res.other.weight = '45kg'
    console.log(res, person);
})

```
##### ✔ 递归 deepClone()

```js

const person = {
    name: 'xm', age: '18', other: {
        weight: '50kg',
        sex: 'female'
    }
}

const deepClone = (obj) => {
    if (obj === null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj;
    // 判断obj参数是对象还是数组来初始化返回值
    const cloneObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) { // 防止遍历原型链上的属性
            // 实现一个递归拷贝
            cloneObj[key] = deepClone(obj[key]);
        }
    }
    return cloneObj;
}

const newObj = deepClone(person);

```
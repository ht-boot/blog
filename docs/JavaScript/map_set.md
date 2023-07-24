---
title: Map、Set
outline: deep
author: ht
date: 2021-7
tags: ['javascript']
---

### 🟥 Map
Map 对象保存键值对，具有极快的查找速度，且key值可以为任何类型。

``` js
// map 常用方法
let m = new Map([['abs', 95], ['ggb', 75], ['okb', 85]]);
m.get('abs');           // 95

let mp = new Map();          // 空Map
mp.set('abc', 67);          // 添加新的key-value
mp.has('abc');              // 是否存在key 'xxg': true
mp.get('abc');              // 67
mp.delete('abc');           // 删除key 'xxg'
mp.get('abc');              // undefined

```

Map 一个key只能对应一个value，多次对一个key放入value, value值会被后面的替换

```js
var m = new Map();
m.set('Adam', 67);
m.set('Adam', 88);
m.get('Adam'); // 88
```

### 🟦 Set
Set和Map类似，也是一组key的集合，但不存储value。由于key不能重复， 所以常用于清楚数组中的重复值。

```js

let arr = new Set() // 空set
let arr2 = new Set([1,2,3]) // 含 1 2 3


// 重复值会被Set过滤掉

let newArr = new Set([1,3,3,4,'3']) // Set {1, 3, 4, "3"} 

// Set 的方法

newArr.add(5) // Set {1, 3, 4, "3", 5} 

newArr.delete(3) // Set {1, 4, "3", 5} 

newArr.has(3) // false

```


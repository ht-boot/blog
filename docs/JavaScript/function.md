---
title: Js 数组方法
outline: deep
author: ht
date: 2021-6
tags: ['javascript']
---

## 🟧 JS 数组方法

### 🔄 改变原数组

- push() - 在末尾添加元素
- pop() - 在末尾删除元素
- unshift()- 头部添加元素
- shift() - 删掉头部首个元素,并返回第一个元素
- sort() - 排序
- reverse() - 反转排序
- splice() - 粘接(添加、删除、替换、截取)

> arr.splice(start[, deleteCount[, item1,[ item2, item3...]]])
>
> start: （包含）修改起始位置
>
>deleteCount：整数，删除的元素个数，从start开始，为0或负数，不删除元素
>
>item：要添加（替换）进数组的元素，从start开始

```js
// 所有操作以 arr = [1, 2, 3, 4] 为准
let arr = [1, 2, 3, 4]

// 截取
arr.splice(1) // arr =  [1]

// 删除
arr.splice(1, 1) // arr = [1, 3, 4]

// 添加
arr.splice(1, 0, 'a') // arr = [1, 'a', 2, 3, 4]

// 替换
arr.splice(1, 1, 'bbs') // arr = [1, 'bbs', 3, 4 ]
```

### ⏺️ 不改变原数组

- slice() - 截取数组的部分元素
```js
let arr = ['js', 'html', 'css', 'ts']

let a = arr.slice(2, 3) // 截取的值 包含开始不包含结尾[2, 3)

a // ['css']

```
- concat() - 数组合并数组 并返回一个新的数组
- indexOf lastIndexOf - 查找数组中的项，返回对应索引
- join() - 把当前数组的每个元素都用指定的字符串连接起来，然后返回连接后的字符串


### 🔣 forEach() 数组遍历
> 数组名.forEach((item,index,arr) => {}) 
> 
> item: 遍历的value值
>
> index: 下标
>
> arr: 原数组

```js
let arr = ['a', 'b', 'c', 'd', null, '', undefined]

arr.forEach((item, index, arr) => {
    console.log(item); // a b c d null 空  undefined
})
```

### 🔣 map() 数组映射
> 数组名.map((item,index,arr) => {}) 
> 
> item: 遍历的value值
>
> index: 下标
>
> arr: 原数组
>
> <p style="color: #dc3545">返回值: 必然是一个数组 一个映射完毕的数组；这个数组合原数组长度一样 </p>

```js
let arr = ['a', 'b', 'c', 'd', null, '', undefined]

const newArr = arr.map(item => item + '111')

newArr // ['a111', 'b111', 'c111', 'd111', 'null111', '111', 'undefined111']
```

### 🔣 filter 数组过滤
> 数组名.filter((item,index,arr) => {}) 
> 
> item: 遍历的value值
>
> index: 下标
>
> arr: 原数组
> 
> <p style="color: #dc3545">返回值：如果条件满足筛选的数据会保存在一个数组中；如果没有返回一个空数组。</p>

```js

let arr = ['ty', 'jk', 'rs', 'hs']

let newArr = arr.filter(item => item === 'hs');

newArr // ['hs']

```


### 🔣 every() 判断数组是不是满足所有条件

> 数组名.every((item,index,arr) => {})
> 
> item : 这个表示的是数组中的每一项
>
> index : 这个表示的是每一项对应的索引
>
>arr : 这个表示的是原数组c
>
> <p style="color: #dc3545">作用: 主要是用来判断数组中是不是 每一个 都满足条件, 所有都满足返回true, 只要有一个不满足就是false</p>

```js

let arr = [16, 34, 22, 28, 67, 99]

let b = arr.every(item => item > 18)

b // false
```

### 🔣 some() 判断数组中有没有满足条件的
> 数组名.some((item,index,arr) => {})
> 
> item : 这个表示的是数组中的每一项
>
> index : 这个表示的是每一项对应的索引
>
> arr : 这个表示的是原数组c
>
> <p style="color: #dc3545">作用： 主要是用来判断数组中是不是 每一个 都满足条件, 有一个满足返回true, 都不满足返回false</p>

```js

let arr = [1, 2, 3]

let result = arr.some(item => item > 2)

result //true

```
### 🔣 find() 用来获取数组中满足条件的第一个数据

> 数组名.find((item,index,arr) => {})
> 
> item : 这个表示的是数组中的每一项
> 
> index : 这个表示的是每一项对应的索引
> 
> arr : 这个表示的是原数组
>
> <p style="color: #dc3545">作用： 获取满足条件的第一个数据。如果有就是满足条件的值， 没有就是undefined</P>

```js

let arr = [1, 2, 3]

let res = arr.find(item => item > 0) // 1 满足 > 0, res = 1

res // 1

```
### 🔣 reduce() 叠加

> 数组名.reduce((prev,item,index,arr) => {},初始值)
>
> prev :一开始就是初始值 当第一次有了结果以后；这个值就是第一次的结果
>
> item : 这个表示的是数组中的每一项
>
> index : 这个表示的是每一项对应的索引
>
> arr : 这个表示的是原数组
>
> <p style="color: #dc3545">作用：常用于数组值的相加</P>

```js

let arr = [1, 2, 3, 4, 5, 6]

const count = arr.reduce((prev, item) => prev + item, 0) // 初始值为 0 

count // 21

```







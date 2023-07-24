---
title: 优化代码分支
outline: deep
author: ht
date: 2022-3
tags: ["JavaScript"]
---

优化代码分支：

代码编写中，常有多个条件进行判断，执行不同的操作， 大多数写法为 if...else if... （如下代码）

```js
function say(val) {
  if (val === "小猫") {
    console.log("喵喵");
  } else if (val === "小狗") {
    console.log("汪汪");
  } else if (val === "小鸡") {
    console.log("鸡你太美");
  } else if (val === "女朋友") {
    console.log("老子数到三");
  }
}
say("小鸡");
```

少量代码还可以， 一旦条件过多就会导致代码非常难看。如何优化？

```js
// 将判断的条件与执行结果映射成为对象。
function say(val) {
  const map = {
    // 也可将 map 对象设置成一个配置文件。
    小猫: "喵喵",
    小狗: "汪汪",
    小鸡: "鸡你太美",
    女朋友: "老子数到三",
  };

  if (map[val]) {
    // 只需判断对象里面的属性在不在即可。
    console.log(map[val]);
  } else {
    console.log("。。。。。。");
  }
}

say("小鸡");

// 也可进一步修改为
function say(val) {
  // 可将 map 对象设置成一个配置文件 单独导入
  const map = {
    小猫: () => console.log("喵喵"),
    小狗: () => console.log("汪汪"),
    小鸡: () => console.log("鸡你太美"),
    女朋友: () => console.log("老子数到三"),
  };

  if (map[val]) {
    map[val]();
  } else {
    console.log("。。。。。。");
  }
}

say("小鸡");
```

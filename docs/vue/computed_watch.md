---
title: Vue3 computed watch
outline: deep
author: ht
date: 2021-5
tags: ["Vue", "JavaScript"]
---

### 🥥 vue computed 计算属性与 watch 监听

>

#### 🫓 computed 计算属性

> 计算属性拥有的两个方法：getter setter 用来实现数据的双向绑定

> 传入一个 getter 函数，返回一个默认不可手动修改的 ref 对象。

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // 报错
```

> 传入一个拥有 get 和 set 函数的对象，创建一个可手动修改的计算状态

```js
import { computed, ref } from "vue";

const count = ref(1);

const plusOne = computed({
  set() {
    return count.value + 1;
  },
  set(val) {
    count.value = val - 1;
  },
});

plusOne.value = 1;】

console.log(plusOne.value) // 0
```

#### 🫓 watch 监听

用于数据更改时调用的侦听回调

```js
import { ref, watch } from "vue";

const DOMRef = ref(null);
const number = ref(1);

const handle = () => {
  number.value++;
};

watch(number, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});

<template>
  <div ref="DOMRef">Count</div>
</template>;
```

watch 监听多个对象

```js
import { ref, watch } from "vue";

const one = ref(1);
const two = ref(2);

watch([one, two], (val) => {
  console.log(val); // [2, 3]
});

const handle = () => {
  one.value++;
  two.value++;
};

handle();
```

> immediate：在侦听器创建时立即触发回调。
> deep：如果源是对象或数组，则强制深度遍历源，以便在深度变更时触发回调。

```js
import { watch } from "vue";

watch(
  parms,
  (val) => {
    // 代码段
  },
  {
    immediate: true, // 监听立即触发回调
    deep: true, // 开启深度监听
  }
);
```

#### 🫓 watchEffect

[参考来源](https://juejin.cn/post/7235547967112167461)

> watchEffect 接受一个函数回调，在组件渲染时立即调用一次回调， 同时自动追踪回调中的响应式依赖，当响应式依赖数据变更时会重新执行回调。

> 第一个参数，侦听器回调，该回调提供了一个参数。
>
> - onCleanup 可清除过期的副作用函数

> 第二个为可选参数，是一个配置对象，有以下属性：

> - flush：调整回调函数的刷新时机
> - 1. pre： 默认配置，组件挂载前 或 组件更新前 执行侦听器回调，并且会缓存侦听器回调，异步刷新，所以同时改变多个依赖数据只会调用一次侦听器回调。
> - 2. post： 组件挂载后 或 组件更新后 执行侦听器回调，并且会缓存侦听器回调，异步刷新，所以同时改变多个依赖数据只会调用一次侦听器回调。
> - 3. sync： 组件挂载前 或 组件更新前 执行侦听器回调，并且不会缓存侦听器回调，同步刷新，所以同时改变多个依赖数据会多次调用侦听器回调。（性能不好）
>
> - onTrack / onTrigger：调试侦听器的依赖

```js
watchEffect(
  (onCleanup) => {
    console.log("watchEffect");
    onCleanup(() => {});
  },
  {
    flush: pre, // 默认配置，组件挂载前 或 组件更新前 执行侦听器回调
  }
);
```

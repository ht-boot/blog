---
title: 单页面首屏加载优化
outline: deep
author: ht
date: 2023-8
tags: ["Vue", "优化"]
---

## 单页面首屏加载优化

### 1. 异步组件

Vue 提供了 defineAsyncComponent 方法来实现此功能. [官网地址](https://cn.vuejs.org/guide/components/async.html)，

与普通组件一样，异步组件可以使用 app.component() 全局注册

```vue
<script>
import { defineAsyncComponent } from "vue";

// 异步导入组件
const AsyncComp = defineAsyncComponent(() =>
  import("./components/MyComponent.vue")
);

// 全局注册
app.component(
  "MyComponent",
  defineAsyncComponent(() => import("./components/MyComponent.vue"))
);
</script>

<!-- 使用组件 -->
<template>
  <div>
    <AsyncComp />
  </div>
</template>
```

### 2. 路由懒加载

### 3. 组件加载方式使用按需加载的方式.

例如： ECharts, UI 组件（antd, element-ui）。 或者自己写一个方法 通过 **import** 实现按需导入组件, 如下：

```js
import { ref } from "vue";

const MyComponent = ref(null);

// 调用这个方法实现 组件导入
const asyncFun = async () => {
  MyComponent.value = (await import("./components/MyComponent.vue")).default;
};

<template>
  <div>
    <MyComponent />
  </div>
</template>;
```

### 4. 静态资源本地缓存或者 http 协议。

### 5. 使用骨架屏。

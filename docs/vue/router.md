---
title: router、add router
outline: deep
author: ht
date: 2021-5
tags: ["vue", "JavaScript", "route"]
---

### 🥙 Vue Router

Vue Router 是 Vue.js 的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。

### 🥙 安装

>

#### 直接下载 / CDN

[https://unpkg.com/vue-router@3/dist/vue-router.js](https://unpkg.com/vue-router@3/dist/vue-router.js)

#### npm 安装与使用

```sh
npm install vue-router
```

vue 路由使用

这里只写基本代码用作演示，详细查看[官方文档](https://router.vuejs.org/zh/)。

```ts
// index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home.vue"),
    // redirect: "/",
    redirect: (to) => {
      console.log(to);
      return {
        path: "/home",
        query: {
          name: "Home",
        },
      };
    },
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../about/.vue"), // component: import('../views/reg.vue')
      },
      { path: "/:nofound(.*)", name: "404", component: 404 }, // 404
    ],
  },
];

const router = createRouter({
  history: createWebHistory(), // history 模式
  routes,
  // 滚动行为 注意: 这个功能只在支持 history.pushState 的浏览器中可用。
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
```

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";

consta app = createApp(App)

app.use(router).mount("#app");

```

### 🥙 addRoute

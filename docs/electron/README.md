---
title: Electron 桌面应用项目搭建！
outline: deep
author: ht
date: 2023-7
tags: ["electron"]
---

## Electron + Vue3 + TS + Vite 桌面应用项目搭建！

### 1. 初始化项目

我们需要先借助 Vite 初始化一个 Vue3+TS 的项目

**_ 执行命令 _**

```sh

npm create vite@latest my-vue-app -- --template vue-ts

npm install

npm run dev

```

![Alt text](/vite_run_image.png)

启动后， 这样一个最简单的 Vue3 + TS + Vite 的前端项目就初始化好了。

### 2.安装 Electron 相关包

初始化一个基本项目后，我们需要在项目中安装一些关于 electron 的包。

**_ 执行命令 _**

安装 electron 包

```sh
npm install electron -D
```

安装 electron-builder 主要用来进行打包

```sh
npm install electron-builder -D
```

安装 vite-plugin-electron

```sh
npm install vite-plugin-electron  -D
```

该包集成了 Vite 和 Electron

安装 rimraf

```sh
npm install rimraf -D
```

该包主要作用是我们快速删除某些文件和文件夹。

### 3. 初始化 Electron

Electron 项目分为了主进程和渲染进程，主进程其实就是我们的 Electron，渲染进程就相当于我们的 Vue 项目。

#### 3.1 新建主进程

在 src 文件下创建主进程文件

```ts
// electron/main.ts
import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false, // 是否开启隔离上下文
      nodeIntegration: true, // 渲染进程使用Node API
      preload: path.join(__dirname, "../electron-preload/index.js"), // 需要引用预加载js文件
      webSecurity: false, // 关闭浏览器同源策略
    },
  });

  // 如果打包了，渲染index.html
  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../index.html"));
  } else {
    let url = "http://localhost:5173"; // 本地启动的vue项目路径 vite 默认服务地址http://localhost:5173
    win.loadURL(url);
  }
};

app.whenReady().then(() => {
  createWindow(); // 创建窗口
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭窗口
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
```

### 4.修改 vite.config.ts

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";

export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: "electron/main.ts",
    }),
  ],
});
```

### 5.修改 package.json

```json
{
  "name": "electron_app_vite",
  "private": true,
  "version": "0.0.0",
  "type": "commonjs", // 修改
  "main": "dist-electron/main.js", // 新增
  "scripts": {
    "dev": "vite",
    "build": "rimraf dist && vite build && electron-builder",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.3.4"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.3",
    "electron": "^25.4.0",
    "electron-builder": "^24.6.3",
    "rimraf": "^5.0.1",
    "typescript": "^5.0.2",
    "vite": "^4.4.5",
    "vite-plugin-electron": "^0.12.0",
    "vue-tsc": "^1.8.5"
  }
}
```

**完工 ！！！！**
